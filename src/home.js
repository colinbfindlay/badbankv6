import React from 'react'
import Card from './context'
import logo from './bank.png'


export default function Home() {
  return (
    <div className="container">
    <br/>
    <Card
      bgcolor="secondary"
      txtcolor="white"
      header="Bad Bank"
      title="Front End Banking Application using React"
      text="Colin Findlay, Class: Feb. 2022, Section B"
      body={(<img src={logo} className="img-fluid" alt="Responsive Image"/>)}
      
    />
    </div>
  )
}
