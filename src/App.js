import React, { useState } from 'react';
import dataItems from "./items.json";

import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  
  const onKeyDown = (e) => {
    const { key } = e;
    
    if (key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      const itemIndex = items.findIndex(({ productName }) => productName === trimmedInput);
      const itemExist = dataItems.items.find(({ name }) => name.toLowerCase() === trimmedInput);
      if (!itemExist) {
        setShowAlert(true);
        return;
      }

      e.preventDefault();

      if (itemIndex >= 0) {
        items[itemIndex].qty += 1;
        setItems(items);
      } else {
        const newProduct = { productName: trimmedInput, qty: 1};
        setItems(prevState => [...prevState, newProduct]);
      }

      setInput('');
    }
  };

  const deleteTag = (index) => {
    setItems(prevState => prevState.filter((tag, i) => i !== index))
  }
  return (
    <div className="container">
      <div className="row">
        <input
          value={input}
          className="form-control "
          placeholder="Enter a product"
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
        {showAlert ? (<div className="alert alert-danger mt-2" role="alert">
          This item is not map in our system, please check the <strong>items.json</strong> file
          <button type="button" class="close" onClick={() => setShowAlert(!showAlert)}>
              <span aria-hidden="true">&times;</span>
          </button>
        </div>) :  null}
      </div>
      <div className="row mt-2 mb-2">
          {items.map(({ qty, productName}, index) => (
            <div className="tag" key={index}>
              {`${qty} ${productName}`}
              <button onClick={() => deleteTag(index)}>x</button>
            </div>
          ))}
      </div>
      {items.length ? (<div className="row">
        <button type="button" className="btn btn-dark">Total</button>
      </div>): null}
      
  </div>
  );
}

export default App;
