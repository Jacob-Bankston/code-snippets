const express = require("express");
const app = express();
const cors = require("cors");
var mongoose = require("mongoose");
const Snippet = require("./schemas/snippet");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost/codesnippetsdb",
  {
    useNewUrlParser: true
  },
  error => {
    if (!error) {
      console.log("Successfully connected to MongoDB database!");
    }
  }
);

// 1. View all of the Code Snippets

app.get("/code", (req, res) => {
  Snippet.find({}, (error, snippets) => {
    if (error) {
      res.json({ error: "Unable to fetch snippets!" });
    } else {
      res.json(snippets);
    }
  });
});

// 2. Adding a Code Snippet

app.post("/code", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const tag = req.body.tag;

  let snippet = new Snippet({
    title: title,
    body: body,
    tag: tag
  });

  snippet.save(error => {
    if (error) {
      res.json({ error: "Unable to save... " });
    } else {
      res.json({snippet});
    }
  });
});

// 3. Filter the Code Snippets based on their Tag

app.get("/code/:tag", (req, res) => {
  const tag = req.params.tag;

  Snippet.find({ tag: tag }, (error, snippet) => {
    if (error) {
      res.json({ error: "It's the wrong tag?!" });
    } else {
      res.json(snippet);
    }
  });
});

// 4. Update the Snippet

app.put("/code", (req, res) => {
  const snippetId = req.body.snippetId;
  const title = req.body.title;
  const body = req.body.body;
  const tag = req.body.tag;

  const updatedSnippet = { title, body, tag };

  Snippet.findByIdAndUpdate(snippetId, updatedSnippet, (error, result) => {
    if (error) {
      res.json({ error: "Unable to update Snippet!" });
    } else {
      res.json({ updated: true });
    }
  });
});

// 5. Delete the Snippet

app.delete("/code", (req, res) => {
  const snippetId = req.body.snippetId;

  Snippet.remove(
    {
      _id: snippetId
    },
    (error, result) => {
      if (error) {
        res.json({ error: "Unable to delete snippet!" });
      } else {
        res.json(result);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running...");
});
