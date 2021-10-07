import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  
  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();
  
    if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }
  };

  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }
  
  return (
    <div className="container">
      {tags.map((tag, index) => (
        <div className="tag" key={index}>
          {tag}
          <button onClick={() => deleteTag(index)}>x</button>
        </div>
      ))}
      <input
        value={input}
        placeholder="Enter a product"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
  </div>
  );
}

export default App;
