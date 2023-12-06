import React, { useState } from 'react';
import { toast } from "react-toastify";
import UserAxios from '../Axios/UserAxios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../Redex/Auth/UserSlice';
import { useNavigate } from 'react-router-dom';

const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const navigate  = useNavigate()

     const dispatch = useDispatch();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (index < 5 && value !== '') {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join('');
    try {
        const response = await UserAxios.post('/verify',{enteredOtp})
        dispatch(
            setCredentials({
              token: response.data.token,
              user: response.data.user.name,
              _id: response.data.user._id,
            })
          );
        toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          navigate('/home')
    } catch (error) {
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
        <div className="flex justify-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              className="w-12 h-12 border rounded-md text-2xl text-center focus:outline-none focus:border-blue-500"
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpInput;
