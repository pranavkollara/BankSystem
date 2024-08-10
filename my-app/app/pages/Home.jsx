import React from 'react'
import Transactions from '../modules/Transactions'
import Balance from '../modules/Balance'
import Navbar from '../modules/Navbar'
export default function Home({userid,username}) {
  return (
    <div>
      <Navbar userid={userid} username = {username}></Navbar>
      <Balance userid={userid}></Balance>
      <Transactions userid={userid}></Transactions>
    </div>
  )
}
