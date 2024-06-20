import React,{useState} from 'react'

const Checkout: React.FC  = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentMethod(event.target.value);
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Select Payment Method</h2>
        <form>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="Cash"
              checked={paymentMethod === 'Cash'}
              onChange={handlePaymentMethodChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <label htmlFor="cash" className="ml-2 block text-sm font-medium text-gray-700">Cash</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="credit"
              name="paymentMethod"
              value="Credit"
              checked={paymentMethod === 'Credit'}
              onChange={handlePaymentMethodChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <label htmlFor="credit" className="ml-2 block text-sm font-medium text-gray-700">Credit</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="upi"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === 'UPI'}
              onChange={handlePaymentMethodChange}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <label htmlFor="upi" className="ml-2 block text-sm font-medium text-gray-700">UPI</label>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">Selected Payment Method: {paymentMethod}</p>
      </div>
    );
  }
export default Checkout