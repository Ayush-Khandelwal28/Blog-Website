import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navigate} from "react-router-dom";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'file'],
      ['clean']
    ],
  };
const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'file'
  ];

function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [files, setFiles] = useState("");
    const [content, setContent] = useState("");
    const [redirect,setRedirect] = useState(false);
    

    async function createNewPost(ev) {
        const data = new FormData();

        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method:'POST',
            body: data,
            credentials:'include',
        });
       if(response.ok)
       {
        setRedirect(true);
       }

    };

  

    if (redirect) {
    return <Navigate to='/' />
    }
    return (
        <form onSubmit={createNewPost}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            <input type="file" placeholder="file" onChange={(e) => setFiles(e.target.files)} />
            <ReactQuill value={content} modules={modules} formats={formats} 
            onChange={newValue => setContent(newValue)}
            />
            <button style ={{marginTop:'5px'}} type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
