import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    fetchCodingSnippets();
  }, []);

  const titleChange = (e) => {
    setTitle(e.currentTarget.value)
    // console.log(e.currentTarget.value)
  }
  const bodyChange = (e) => {
    setBody(e.currentTarget.value)
    // console.log(e.currentTarget.value)
  }
  const tagChange = (e) => {
    setTag(e.currentTarget.value)
    // console.log(e.currentTarget.value)
  }

  const fetchCodingSnippets = () => {
    fetch("http://localhost:3000/code")
      .then(response => response.json())
      .then(json => {
        setSnippets(json);
      });
  };

  const fetchByTagCodingSnippets = () => {
    fetch(`http://localhost:3000/code/${tag}`)
    .then(response => response.json())
    .then(json => {
      setSnippets(json);
    });
  };

  const addCodingSnippet = () => {
    fetch("http://localhost:3000/code", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        body: body,
        tag: tag,
      })
    }).then(fetchCodingSnippets());
  }

  const updateCodingSnippet = (snippetId) => {
    fetch("http://localhost:3000/code/tag", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        snippetId: snippetId,
        title: title,
        body: body,
        tag: tag,
      })
    }).then(fetchCodingSnippets());
  }

  const deleteCodingSnippet = (snippetId) => {
    fetch("http://localhost:3000/code", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        snippetId: snippetId,
      })
    }).then(fetchCodingSnippets());
  }

  return (
    <div>
      <div>
      <input type="text" name="title" placeholder="Code Snippet Title" onChange={titleChange} />
      <input type="text" name="body" placeholder="Code Snippet Body" onChange={bodyChange} />
      <input type="text" name="tag" placeholder="Code Snippet Tag" onChange={tagChange} />
      <button onClick={() => addCodingSnippet()}>Add Code Snippet</button>
      </div>
      <div>
        <button onClick={() => fetchByTagCodingSnippets()}>Tag Filter</button>
      </div>
      {snippets.map(snippet => {
        return (
          <div>
            <h3>{snippet.title}
            <button onClick={() => updateCodingSnippet(snippet._id)}>Update</button></h3>
            <p>{snippet.body}</p>
            <span>Tag: {snippet.tag}
            <button onClick={() => deleteCodingSnippet(snippet._id)}>X</button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
