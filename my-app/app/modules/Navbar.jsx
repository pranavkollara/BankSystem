"use client"

import React, {  useEffect, useRef } from 'react'
import {
    ClerkProvider,
    SignIn,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'



export default  function Navbar({userid,username}) {
    const userAddedRef = useRef(false);

    useEffect(()=>{
        async function add(uid) {
            if(userAddedRef.current) return
            userAddedRef.current = true;
            const response = await fetch(`http://localhost:4000/adduser`,{
                method:"POST",
                headers:{
                    Accept: "application/json",
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    id:userid,
                    name:username,
                })
            })
        }
        add(userid);
    },[userid,username])
    


   


  return (
    <div>
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Bank</a>
  </div>
  <div className="flex-none gap-2">
    <UserButton></UserButton>
  </div>
</div>
    </div>
  )
}
