import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Input from '../../components/inputs/Input';
import ProfilePicSelector from '../../components/inputs/ProfilePicSelector';

const Signup = ({setCurrPage}) => {
  const [profilePic,setProfilePic] = useState(null);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup =(e) => {
    e.preventDefault();
  }

  return (
     <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create a new Account</h3>
      <p className='txt-xs text-slate-700 mt-[5px] mb-6'>Join us today!</p>

      <form onSubmit={handleSignup}>

        <ProfilePicSelector image={profilePic} setImage={setProfilePic}/>

        <Input
        value={email}
        onChange={({target})=>setEmail(target.value)}
        label="Email Address"
        placeholder="abc@mail.com"
        type="text"
        />

        <Input
        value={name}
        onChange={({target})=>setName(target.value)}
        label="Full Name"
        placeholder="abc"
        type="text"
        />

        <Input
        value={password}
        onChange={({target})=>setPassword(target.value)}
        label="Password"
        placeholder="Min 6 Characters"
        type="password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary'>SIGNUP</button>

        <p className='text-[13px] text-slate-800 mt-3'>Already a member?{" "}
          <button className='font-medium text-primary underline cursor-pointer' onClick={()=>{
            setCurrPage("login");
          }}>Login</button>
        </p>
        

      </form>
    </div>
  )
}

export default Signup