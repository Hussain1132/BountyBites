import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + getTotalCartAmount() / 20
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token }
    });

    if (response.data.success) {
      const { order, newOrderId } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "BountyBites",
        description: "Order Payment",
        order_id: order.id,
        handler: function (res) {
          window.location.href =
            `/verify?orderId=${newOrderId}` +
            `&razorpay_order_id=${res.razorpay_order_id}` +
            `&razorpay_payment_id=${res.razorpay_payment_id}` +
            `&razorpay_signature=${res.razorpay_signature}`;
        },
        prefill: {
          name: data.firstName + " " + data.lastName,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#121212",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Error while placing order.");
    }
  };

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type='text' placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type='text' placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() / 20}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + getTotalCartAmount() / 20}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;
