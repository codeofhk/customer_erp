import React,{useState} from 'react'

const Checkout: React.FC  = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod(event.target.value);
    };
  
    return (
      <div>
        <h2>Select Payment Method</h2>
        <form>
          <div>
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="Cash"
              checked={paymentMethod === 'Cash'}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="cash">Cash</label>
          </div>
          <div>
            <input
              type="radio"
              id="credit"
              name="paymentMethod"
              value="Credit"
              checked={paymentMethod === 'Credit'}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="credit">Credit</label>
          </div>
          <div>
            <input
              type="radio"
              id="upi"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === 'UPI'}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="upi">UPI</label>
          </div>
        </form>
        <p>Selected Payment Method: {paymentMethod}</p>
      </div>
    );
  };

export default Checkout