"use client"
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../modules/Navbar'
//serepeb883@alientex.com

export default function Adminpage({userid,username}) {
    

    const getdata = useRef(false);
    const[users,setUsers] = useState([]);
    const[sender,setSender] = useState();
    const[receiver,setReceiver] = useState();
    const[amount,setAmount] = useState(0);
    useEffect(()=>{
        async function gett() {
            if(getdata.current) return;
            getdata.current=true;
            const respone = await fetch(`http://localhost:4000/users`)
            
            const data = await respone.json();
            console.log(data)
            setUsers(data)
        }
        gett();
    },[])

    function handlesender(e){
        setSender(e.target.value);
        console.log(e.target.value)
    }
    function handlereceiver(e){
        setReceiver(e.target.value);
        console.log(e.target.value)
    }
    function handleamount(e){
        setAmount(e.target.value);
    }
    function pay(){
        fetch('http://localhost:4000/transaction',{
                method:"POST",
                headers:{
                    Accept: "application/json",
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    id1:sender,
                    id2:receiver,
                    amount:amount
                })
        })
    }

  return (
    <div>
      
      <Navbar userid={userid} username={username}></Navbar>
      <select onChange={handlesender} value={sender} className="select select-bordered w-full max-w-xs">
      <option disabled selected>Sender</option>
      {
        users.map((element,key)=>{
            return(
                <option value={element.id}>{element.name}</option>
            )
        })
      } 
    
      </select>
      <select onChange={handlereceiver} value={receiver} className="select select-bordered w-full max-w-xs">
      <option disabled selected>Sender</option>
      {
        users.map((element,key)=>{
            return(
                <option value={element.id}>{element.name}</option>
            )
        })
      } 
    
      </select>
      <input type="number" placeholder="Type here" value={amount} className="input input-bordered w-full max-w-xs" onChange={handleamount} />
      <button className='btn btn-primary' onClick={pay}>Done</button>
    </div>
  )
}
