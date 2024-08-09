"use client"
import React, { useEffect, useRef, useState } from 'react'

export default function Balance({userid}) {

    const getdata = useRef(false);
    const[balance,setBalance] = useState(0);
    useEffect(()=>{
        async function gett() {
            if(getdata.current) return;
            getdata.current=true;
            const respone = await fetch(`http://localhost:4000/balance/${userid}`)
            
            const data = await respone.json();
            console.log(data.balance);
            setBalance(data.balance)
        }
        gett();
    },[userid])

  return (
    <div>
      <div className="stats shadow  min-w-32">
  <div className="stat">
    <div className="stat-title">Balance</div>
    <div className="stat-value">{balance}</div>
  </div>
</div>
    </div>
  )
}
