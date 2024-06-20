import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom'

interface GroceryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const Billing: React.FC = () => {

  const billingNo = localStorage.getItem('billing_no');
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);
  const [itemNameSuggestion, setItemNameSuggestion] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();


  const handleAddItem = () => {
    if (itemName.trim() === '' || itemQuantity <= 0 || itemPrice <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }
    const newItem: GroceryItem = {
      id: itemId,
      name: itemName,
      quantity: itemQuantity,
      price: itemPrice,
    };
    setItems([...items, newItem]);
    setItemName('');
    setItemQuantity(1);
    setItemPrice(0);
  };
  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {

    axios
      .post('http://localhost:8000/api/billing', {"billing_id":billingNo,items}, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Redirect to billing page with items
        navigate('/customer', { state: { totalPrice: totalPrice } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleItemName = async (e: React.ChangeEvent<HTMLInputElement>) => { 

    await axios.get(`http://localhost:8000/api/billing/item/check?item=${e.target.value}`)
    .then((response) => {
      if(response.data.message.length === 1) { handleItemPrice(response.data.message[0]) } 
      setItemNameSuggestion(response.data.message) 
    } )
  };

  const handleItemPrice = async (e: string) => {
    await axios.get(`http://localhost:8000/api/billing/item/price?item=${e}`)
    .then((response) => {
      setItemPrice(response.data.price)
      setItemId(response.data.id) 
    } )
  }

  const handleItemSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemName(e.target.value);
    setItemNameSuggestion([]);
    handleItemPrice(e.target.value)

  }

  const handleDiscount = () => {
    setItems(prevItems => {
      return prevItems.map(item => {
        return {
          ...item,
          price: parseFloat((item.price - (item.price * discount / 100)).toFixed(2)),
        };
      });
    })
}
  const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-12 max-w-7xl bg-paper">
      <h1 className="text-3xl font-bold mb-6 text-center">Grocery Billing Page</h1>
      {billingNo && (
      <div className="mt-4">
        <h3 className="text-lg font-bold mb2 text-right px-4">Billing No: {billingNo}</h3>
      </div>
    )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
       <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
            Item Name
          </label>
          <input
            id="itemName"
            type="text"
            value={itemName}
            onChange={(e) => {setItemName(e.target.value);handleItemName(e);}}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <select onChange={handleItemSelection} className=' mt-4'>
            {itemNameSuggestion.map((item,index) => (
              <option className='block text-gray-700 text-sm font-bold mb-2' key={index} value={item} >
                {item}
              </option>
            ))}
          </select>
       </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemQuantity">
            Quantity
          </label>
          <input
            id="itemQuantity"
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(parseInt(e.target.value, 10))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
       <div>
          <h2 className="block text-gray-700 text-sm font-bold mb-2"> 
            Price
          </h2>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{itemPrice}</p>   
        </div>
        <div>
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-6">
            Add Item
          </button>
        </div>
      </div>
      <h2 className="text-2xl mb-4 mt-8">Items:</h2>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left border-black border-4">
            <thead className="text-xs text-black uppercase">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Product Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Quantity
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Total Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const totalPrice = (item.quantity * item.price).toFixed(2);
                return (
                  <tr key={item.id} className="border-y dark:border-gray-700">
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{item.quantity}</td>
                    <td className="py-4 px-6">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-6">${totalPrice}</td>
                    <td className="py-4 px-6">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> 
        <div className="grid grid-cols-2 my-6">
          <div>
            <h3 className="text-lg font-bold">Discount</h3>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type='text'
              value={discount}
              onChange={(e) => {setDiscount(isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10))}}
            />
            <button onClick={handleDiscount} className=' px-4 border border-gray-700 rounded-md mx-6'>Add Discount</button>
          </div>
        </div>
        <div className="text-right">
            <h3 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h3>
          </div>
      <div className='grid justify-end py-6'>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Billing;