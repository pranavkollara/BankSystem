import React from 'react'
import Navbar from '../modules/Navbar'

export default function Adminpage({userid,username}) {
  return (
    <div>
      admin page
      <Navbar userid={userid} username={username}></Navbar>
    </div>
  )
}
