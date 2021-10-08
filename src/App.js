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
  
  const onKeyDown = ({ key }) => {    
    if (key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      const itemIndex = items.findIndex(({ itemName }) => itemName === trimmedInput);
      const itemExist = dataItems.items.find(({ name }) => name.toLowerCase() === trimmedInput);
      if (!itemExist) {
        setShowAlert(true);
        return;
      }

      if (itemIndex >= 0) {
        items[itemIndex].qty += 1;
        setItems(items);
      } else {
        const newProduct = { itemName: trimmedInput, qty: 1};
        setItems(prevState => [...prevState, newProduct]);
      }

      setInput('');
    }
  };

  const deleteTag = (index) => {
    setItems(prevState => prevState.filter((tag, i) => i !== index))
  }

  const priceCalculator = () => {
    const result = [];
    for (let item of items) {
      const itemStore = dataItems.items.find(({ name }) => name.toLowerCase() === item.itemName);
      if (itemStore) {
        if (itemStore.sale) {
          item.total = 0;
          let qtyItem = item.qty;
          while (qtyItem >= itemStore.sale.qty) {
            item.total += itemStore.sale.price;
            qtyItem -= itemStore.sale.qty;
          }
          item.total = qtyItem ? item.total + (qtyItem * itemStore.price) : item.total;
          result.push(item);
        } else {
          result.push({...item, total: (item.qty * itemStore.price)});
        }
      }
    }

    console.log(result)
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
          {items.map(({ qty, itemName}, index) => (
            <div className="tag" key={index}>
              {`${qty} ${itemName}`}
              <button onClick={() => deleteTag(index)}>x</button>
            </div>
          ))}
      </div>
      {items.length ? (<div className="row">
        <button type="button" className="btn btn-dark" onClick={priceCalculator}>Total</button>
      </div>): null}
      
  </div>
  );
}

export default App;
