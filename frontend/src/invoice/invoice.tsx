import React, { useState } from 'react';

interface GroceryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface PaymentMethod {
  id: number;
  name: string;
  description: string;
}

interface PaymentInfo {
  paymentMethodId: number;
  amount: number;
}

interface BillingPageProps {
  items: GroceryItem[];
  subtotal: number;
  taxRate: number;
  total: number;
  paymentMethods: PaymentMethod[];
  onSubmit: (paymentInfo: PaymentInfo) => void;
  onCancel: () => void;
}

const Invoice: React.FC<BillingPageProps> = ({
  items,
  subtotal,
  taxRate,
  total,
  paymentMethods,
  onSubmit,
  onCancel,
}) => {
  const [paymentMethodId, setPaymentMethodId] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethodId(parseInt(event.target.value, 10));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!paymentMethodId) {
      setError('Please select a payment method');
      return;
    }
    const paymentInfo: PaymentInfo = {
      paymentMethodId,
      amount: total,
    };
    onSubmit(paymentInfo);
  };

  return (
    <div>
      <h1>Invoice Page</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Tax ({taxRate}%): ${((subtotal * taxRate) / 100).toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Payment Method:
          <select value={paymentMethodId} onChange={handlePaymentMethodChange}>
            <option value="">Select a payment method</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </label>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Submit Payment</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Invoice;