import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Checkout from './checkout';
import axios from 'axios';


const Customer: React.FC = () => {
  const {state} = useLocation();
  const totalPrice = state?.totalPrice;

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [selectContact, setSelectContact] = useState<number[]>([]); // Specify the type of elements in the array

  const [newCustomer,setNewCustomer] = useState<string>('');
  const [checkout, setCheckout] = useState<boolean>(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);

    if(e.target.value.length > 0) {

    await axios.get(`http://localhost:8000/api/billing/customer/check?contact=${e.target.value}`)
      .then((response) => {
        console.log (response.data);
        const data = response.data;

        if (data.customer === 0) {
          console.log('No results');
          setNewCustomer('Enter New Customer')
          setSelectContact([]); // No results, clear the select dropdown
        } else if (data.customer === 1) {
          // Assuming the response data is an array of arrays with the following structure:
          // [[id, firstName, email, address, contact], ...]
          const [, firstName, email, address, contact] = data.details;
          setFirstName(firstName);
          setLastName('');
          setEmail(email);
          setAddress(address);
          setContact(contact);
          setSelectContact([]); // Only one result, no need for a dropdown
        } 
        else{
          setSelectContact( response.data.contact ); // Multiple results, populate the dropdown
        }
      });}
    else{
        setFirstName('');
        setLastName('');
        setEmail('');
        setAddress('');
        setSelectContact( [] ); 
      }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleContactClick = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const contact = e.target.value;
    setContact(contact);
    await axios.get(`http://localhost:8000/api/billing/customer/check?contact=${e.target.value}`)
    .then((response) => {
      console.log(response.data)

      const data = response.data.customer;

      const [_, firstName, email, address, contact] = data;
      setFirstName(firstName);
      setLastName('');
      setEmail(email);
      setAddress(address);
      setContact(contact);
      setSelectContact([]); // Only one result, no need for a dropdown
      });
    setSelectContact([]);
  }

  const handleNewCustomer = async () => {
    console.log({
      name: firstName + ' ' + lastName,
      email: email,
      phone_number: contact,
      address: address,
    })

    await axios.post('http://localhost:8000/api/billing/customer', {
      name: firstName + ' ' + lastName,
      email: email,
      phone_number: contact,
      address: address,
    })
    .then((response) => {
      console.log(response.data);
    });
  }

  const handleCheckout = () => { 

    setCheckout(true);
    
  }

  return (
    <div className="container mx-auto max-w-7xl p-6 bg-white shadow-md rounded-md flex flex-col">
      <h1 className="text-2xl font-semibold mb-4 text-center">Customer Details</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className=' flex'>
          <label className="block text-gray-700 font-medium m-2">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className=' flex'>
          <label className="block text-gray-700 font-medium m-2">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          /> 
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className=" flex mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className=" flex mb-4">
          <label className="block text-gray-700 font-medium mb-1">Contact:</label>
          <input
            type="text" // Corrected type for contact field
            value={contact}
            onChange={handlePhoneNumberChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Address:</label>
        <input
          type="text" // Corrected type for address field
          value={address}
          onChange={handleAddressChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {selectContact.length === 0 ? (
          <button onClick={handleNewCustomer}>{newCustomer}</button>
        ) : (
          <select
            className="w-full mt-2 rounded shadow-lg"
            onChange={(e) => handleContactClick(e)}>
            {selectContact.map((contact, index) => (
              <option key={index} value={contact}>
                {contact}
              </option>
            ))}
          </select>
        )}
      </div>

      <h2 className="text-xl font-medium text-right">Total Price: {totalPrice}</h2>

      <button onClick={handleCheckout}>Checkout</button> 
      {checkout ? <Checkout/>:<> </>}
    </div>
  );
};

export default Customer;