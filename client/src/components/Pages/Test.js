import React, { useEffect, useState } from 'react';

const Test = () => {
  const [post, setPost] = useState({ body: '', title: '' });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => setPost({ body: data.body, title: data.title }));
  }, []);
  return (
    <div>
      <h1> Test</h1>
      {post.title ? (
        <div>
          <h2>{post.title}</h2> <p>{post.body}</p>{' '}
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Test;
