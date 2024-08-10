"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../modules/Navbar";
//serepeb883@alientex.com

export default function Adminpage({ userid, username }) {
  const getdata = useRef(false);
  const paid = useRef(false);
  const [users, setUsers] = useState([]);
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [amount, setAmount] = useState(0);
  const [info, setInfo] = useState();
  useEffect(() => {
    async function gett() {
      if (getdata.current) return;
      getdata.current = true;
      const respone = await fetch(`http://localhost:4000/users`);

      const data = await respone.json();
      console.log(data);
      setUsers(data);
    }
    gett();
  }, []);

  function handlesender(e) {
    setSender(e.target.value);
    console.log(e.target.value);
  }
  function handlereceiver(e) {
    setReceiver(e.target.value);
    console.log(e.target.value);
  }
  function handleamount(e) {
    setAmount(e.target.value);
  }
  async function pay() {
    paid.current = true;
    const respone = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id1: sender,
        id2: receiver,
        amount: amount,
      }),
    });
    const data = await respone.json();
    console.log(data);
    setInfo(data);
  }

  return (
    <div className="w-screen h-screen">
      <Navbar userid={userid} username={username}></Navbar>
      <div className="w-screen flex justify-center flex-col items-center gap-4 pt-4">
        <select
          onChange={handlesender}
          value={sender}
          className="select select-bordered w-screen max-w-[24rem] "
        >
          <option disabled selected>
            Sender
          </option>
          {users.map((element, key) => {
            return <option value={element.id}>{element.name}</option>;
          })}
        </select>
        <select
          onChange={handlereceiver}
          value={receiver}
          className="select select-bordered w-screen max-w-[24rem]"
        >
          <option disabled selected>
            Reciever
          </option>
          {users.map((element, key) => {
            return <option value={element.id}>{element.name}</option>;
          })}
        </select>
        <input
          type="number"
          placeholder="Type here"
          value={amount}
          className="input input-bordered w-screen max-w-[24rem]"
          onChange={handleamount}
        />
        <button className="btn btn-primary" onClick={pay}>
          Pay
        </button>
        <div className=" bg-white w-screen max-w-[24rem] h-fit rounded-lg input-bordered p-4">
          {paid.current && info && (
            <p className="stat-value text-xl text-center">{info.Message}</p>
          )}
          {paid.current && info.Receiver && (
            <p className="stat-value text-xl text-center">
              Receiver Balance : {info.Receiver}
            </p>
          )}
          {paid.current && info.Sender && (
            <p className="stat-value text-xl text-center">
              Sender Balance : {info.Sender}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
