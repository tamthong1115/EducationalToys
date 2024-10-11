import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";


const Header = () => {
  const [buttonLogin, setButtonLogin] = useState(false);
  const [buttonRegister, setButtonRegister] = useState(false);
  const [buttonForgotPassowrd, setButtonForgotPassowrd] = useState(false);
  const handleLogin = () => {
    setButtonLogin(!buttonLogin);
  }

  const handleRegister = () => {
    setButtonRegister(!buttonRegister);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleHaveNotAccount = () => {
    setButtonLogin(!buttonLogin);
    setButtonRegister(!buttonRegister);
  }

  const handleForgotPassword = () => {
    setButtonLogin(!buttonLogin);
    setButtonRegister(!buttonRegister);
    setButtonForgotPassowrd(!buttonForgotPassowrd);
  }
  return (
    <>
      <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <h1 className="text-2xl">Welcome to My App</h1>
        <div className="">
          <button className="mr-[10px] text-[18px] hover:italic hover:underline font-[400]" id="button-login" onClick={handleLogin}>Log In</button>
          <button className="text-[18px] hover:italic hover:underline bg-[#757FE2] p-[8px] rounded-[10px] font-[400]" onClick={handleRegister}>Register</button>
          <button className="hidden text-[18px] hover:italic hover:underline font-[400]">Log Out</button>
        </div>
      </header>
      {/* login */}
      <div id="test" className={"" + (buttonLogin ? "block" : "hidden")}>
        <div className="fixed z-9998 w-[100%] h-[100%] bg-black  opacity-[0.4] top-0 left-0"  onClick={handleLogin}></div>
        <div className="flex justify-center items-center relative z-9999">
          <form className="bg-[#FFFFFF] rounded-[6px] border-[1px] border-solid border-[#ddd] w-[550px] h-auto fixed p-[40px] top-[150px]">
            <h2 className="mb-[20px] text-[36px] font-[700]">Login</h2>
            <div className="">
              <input type="email" name="email" placeholder="Enter yours email...." className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]" />
            </div>
            <div className="">
              <input type="password" name="password" placeholder="Enter yours password" className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]" />
            </div>
            <button className="h-[60px] bg-[#818CF8] text-[white] font-[500] w-[100%] rounded-[10px] hover:bg-[#231F40]" onClick={handleSubmit}>Login</button>
            <a className="absolute hover:bg-[#231F40] top-[-15px] right-[-18px] text-[16px] bg-[#818CF8] text-white h-[38px] w-[38px] flex items-center justify-center rounded-full font-[700] cursor-pointer" onClick={handleLogin}>X</a>
            <div className="flex justify-between items-center cursor-pointer mt-[10px]">
              <span className="hover:italic hover:underline" onClick={handleForgotPassword}>You forgot password ?</span>
              <span className="hover:italic hover:underline" onClick={handleHaveNotAccount}>You have not account ?</span>
            </div>
          </form>
        </div>
      </div>
      {/* Register */}
      <div id="test" className={"" + (buttonRegister ? "block" : "hidden")}>
        <div className="fixed z-9998 w-[100%] h-[100%] bg-black  opacity-[0.4] top-0 left-0" onClick={handleRegister}></div>
        <div className="flex justify-center items-center relative z-9999">
          <form className="bg-[#FFFFFF] rounded-[6px] border-[1px] border-solid border-[#ddd] w-[550px] h-auto fixed p-[40px] top-[150px] z-99999">
            <h2 className="mb-[20px] text-[36px] font-[700]">Register</h2>
            <div className="">
              <input type="email" name="email" placeholder="Enter yours email...." className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]" />
            </div>
            <div className="">
              <input type="password" name="password" placeholder="Enter yours password" className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]" />
            </div>
            <button className="h-[60px] bg-[#818CF8] text-[white] font-[500] w-[100%] rounded-[10px] hover:bg-[#231F40]" onClick={handleSubmit}>Register</button>
            <a className="absolute hover:bg-[#231F40] top-[-15px] right-[-18px] text-[16px] bg-[#818CF8] text-white h-[38px] w-[38px] flex items-center justify-center rounded-full font-[700] cursor-pointer" onClick={handleRegister}>X</a>
            <div className="flex justify-between items-center cursor-pointer mt-[10px]">
              <span className="hover:italic hover:underline">Register with google.</span>
              <span className="hover:italic hover:underline">Register with facebook.</span>
            </div>
          </form>
        </div>
      </div>
      {/* Get new password */}
      <div id="test" className={"" + (buttonForgotPassowrd ? "block" : "hidden")}>
        <div className="fixed z-9998 w-[100%] h-[100%] bg-black  opacity-[0.4] top-0 left-0" onClick={handleForgotPassword}></div>
        <div className="flex justify-center items-center relative z-9999">
          <form className="bg-[#FFFFFF] rounded-[6px] border-[1px] border-solid border-[#ddd] w-[550px] h-auto fixed p-[40px] top-[150px] z-99999">
            <h2 className="mb-[20px] text-[36px] font-[700]">Get new password</h2>
            <div className="">
              <input type="email" name="email" placeholder="Enter yours email...." className="h-[60px] py-[10px] px-[20px] outline-none w-[100%] bg-[#F5F5F5] mb-[20px] rounded-[10px]" />
            </div>
            <button className="h-[60px] bg-[#818CF8] text-[white] font-[500] w-[100%] rounded-[10px] hover:bg-[#231F40]" onClick={handleSubmit}>Submit</button>
            <a className="absolute top-[-15px] right-[-18px] text-[16px] bg-[#818CF8] text-white h-[38px] w-[38px] flex items-center justify-center rounded-full font-[700] cursor-pointer hover:bg-[#231F40]" onClick={handleForgotPassword}>X</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;