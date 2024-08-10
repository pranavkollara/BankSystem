"use client"


import React, { useEffect, useRef, useState } from 'react'
import Home from './Home'
import Adminpage from './Adminpage'

export default function Router({userid,username}) {
    const getdata = useRef(false);
    const[role,setRole] = useState(1);
    useEffect(()=>{
        async function gett() {
            if(getdata.current) return;
            getdata.current=true;
            const respone = await fetch(`http://localhost:4000/role/${userid}`)
            
            const data = await respone.json();
            
            setRole(data)
        }
        gett();
    },[userid])
    if(role==1){
        return (
<div>
      <Home userid={userid} username={username}></Home>
    </div>
        )
    }

  return (
    <>
    <Adminpage userid={userid} username={username}></Adminpage>
    </>
  )
}
