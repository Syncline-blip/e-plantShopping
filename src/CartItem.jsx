import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  console.log('Cart Items:', cart); // Move log here
  const dispatch = useDispatch();
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
  // Calculate total cost for the cart
  const calculateTotalAmount = () => {
  return cart
    .reduce((total, item) => {
      const itemCost = parseFloat(item.cost.replace('$', '').trim());
      const itemQuantity = Number(item.quantity);
      if (!isNaN(itemCost) && !isNaN(itemQuantity)) {
        return total + (itemCost * itemQuantity);
      }
      return total;
    }, 0)
    .toFixed(2); 
  };
  

  // Calculate total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cart
      .reduce((total, item) => {
        const itemQuantity = Number(item.quantity)
        if (!isNaN(itemQuantity)) {
          return total + itemQuantity;
        }

        return total
      }, 0)
  };

  // Handle Increment
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle Decrement
  const handleDecrement = (item) => {
    if (item.quantity - 1 === 0) {
      dispatch(removeItem({ name: item.name }));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Handle Remove
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate Total Cost for an Item
  const calculateTotalCost = (item) => {
    let cost = parseFloat(item.cost.replace('$', '').trim());
    let quant = item.quantity;
    return cost * quant
  };

  const handleContinueShopping = (onContinueShopping) => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      console.log('Continue shopping clicked');
    }
  };
  
  const handleCheckout = () => {
    // console.log("Checkout clicked:", isCheckoutClicked);
    setIsCheckoutClicked(true); 
    setTimeout(() => {
      setIsCheckoutClicked(false);
    }, 10000); 
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Items in Cart: ${calculateTotalQuantity()}</h3>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)} </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckout} 
        >
          Checkout
        </button>

        {isCheckoutClicked && (
          <div style={{ color: 'red', marginTop: '20px' }}>
            Coming Soon...
          </div>
        )}
      </div>
    </div>
    
  );
};

export default CartItem;
