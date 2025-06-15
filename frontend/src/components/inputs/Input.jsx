import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {

    const [showpassword, setShowPassword] = useState(false);

    const toggleShowPassword = ()=>{
        setShowPassword(!showpassword);
    }
  return <div>
    <label className="text-[13px] text-slate-800">{label}</label>
    <div className="input-box">
        <input
         type={type == 'password' ? (showpassword ? "text" : "password"): type}
         placeholder={placeholder}
         className="w-full bg-transparent outline-none"
         value={value}
         onChange={(e)=>onChange(e)}
          />

          {type === 'password' && (
            <>
                {showpassword ? (
                    <FaEye 
                    size={22}
                    onClick={toggleShowPassword} 
                    className="text-primary cursor-pointer"
                    />
                ): (
                    <FaRegEyeSlash 
                    size={22}
                    className="text-slate-400 cursor-pointer"
                    onClick={toggleShowPassword} />
                )}
            </>
          )
          
          }
    </div>
  </div>;
};

export default Input;
