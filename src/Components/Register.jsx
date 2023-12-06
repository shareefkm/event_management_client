import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// import { useDispatch } from 'react-redux';

import UserAxios from "../Axios/UserAxios";

const Register = () => {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;

  const [name, setName] = useState("");
  const [validName, setValidName] = useState();
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [valiPassword, setValiPassword] = useState(false);

     const navigate = useNavigate()
  //    const currentURL = useLocation();

  useEffect(() => {
    const result = name.trim().length >= 4;
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PW_REGEX.test(password);
    setValiPassword(result);
  }, [password]);

  const  handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await UserAxios.post('/register',{name,email,password})
      if(response){
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          navigate('/otpinput')
      }
    } catch (error) {
            toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8 mt-20">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="font-sans text-center font-black text-indigo-500 text-3xl ">
              EVENT MANAGEMENT | REGISTER
            </h1>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-60 absolute">
                  Name
                </p>

                <input
                  placeholder="john"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-4 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
                />
                <span
                  className={
                    validName || !name ? "hidden" : "text-red-600 ml-2"
                  }
                >
                  Name at least 4 charecter
                </span>
              </div>

              <div className="relative">
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-60 absolute">
                  Email
                </p>
                <input
                  placeholder="ex@gmail.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-4 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
                />
                <span
                  className={
                    validEmail || !email ? "hidden" : "text-red-600 ml-2"
                  }
                >
                  Please Enter Valid Email
                </span>
              </div>

              <div className="relative">
                <p
                  className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                             absolute"
                >
                  Password
                </p>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className=" border placeholder-gray-400 focus:outline-none
                                focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-4 mr-0 mb-0 ml-0 text-base block bg-white
                                 border-gray-300 rounded-md"
                />
                <span
                  className={
                    valiPassword || !password ? "hidden" : "text-red-600 ml-2"
                  }
                >
                  Must contain at least 4 characters, one letter, one number and
                  one special character
                </span>
              </div>
              <div className="relative">
                <button
                  type="submit"
                  className="w-full inline-block pt-4 pr-5 pb-4 pl-5 mt-3 text-xl font-medium text-center text-white bg-indigo-500
                                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="flex justify-between">
              <div>
                <h3
                  className="text-indigo-500 hover:cursor-pointer mt-3"
                  onClick={()=>navigate('/login')}
                >
                  Already have an account?
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
