import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParam] = useSearchParams();
  const orderId = searchParam.get('orderId');
  const razorpay_order_id = searchParam.get('razorpay_order_id');
  const razorpay_payment_id = searchParam.get('razorpay_payment_id');
  const razorpay_signature = searchParam.get('razorpay_signature');

  const { url, token, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/verify`,
        {
          orderId,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({}); // cart khali kar do
        navigate('/home');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Verification error:', error);
      navigate('/');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner">Please wait while Payment verifying</div>
    </div>
  );
};

export default Verify;
