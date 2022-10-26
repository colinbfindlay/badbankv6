import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "./context"
import { BalanceContext } from "./context"
import TransactionList from './TransactionList'
import Card from './context'
import UserList from'./UserList'

export default function AllData() {
  const msg = useContext(UserContext);
  const balanceMsg = useContext(BalanceContext);

  const ctx = useContext(UserContext);  
  const ctxB = useContext(BalanceContext);

  let sum = ctxB.balance.reduce(function(prev, current) {
    return prev + +current.amount
  }, 0);

  let balMsg = (value) => {
    if (value < 0) {
      return (
        "Negative Balance Alert!"
      )
    }
    return "Positive Balance"
  }

  let balCol = (value) => {
    if (value < 0) {
      return (
        "text-danger"
      )
    }
    return "text-success"
  }

  // Code added to fetch data from API
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    //fetch('http://localhost:3001/account/all')
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });

  }, []);


  return (
  <div className="container">
    <div className="row">

      {/* COLUMN 1 -------------------*/}
      <div className="col-sm">
      <br/>
        <Card
        bgcolor="primary"
        txtcolor="white"
        header="User Data"
        title={`Total Users: ${ctx.users.length}`}
        text="Accounts Created:"
        body={
          <>
            <UserList ctx={ctx}/>
          </>
        }
        />
      </div>

      {/* COLUMN 2 -------------*/}
      <div className="col-sm">
        <br/>
          <Card
          bgcolor="dark"
          txtcolor="white"
          header="Transaction Data"
          //title="title"
          //text="text"
          body={
            <>
              <h5 className={balCol(sum)}>Current Balance: ${sum}</h5>
              <div className={balCol(sum)}>Overdraft: {balMsg(sum)}</div>
              <div>Total Transactions: {ctxB.balance.length}</div>
              <div> Transaction History: </div>
              <TransactionList ctxB={ctxB}/>
            </>
          }
          />
      </div>

      {/* COLUMN 3 ----------------------*/}
      <div className="col-sm">
        <br/>

        <Card
          bgcolor="info"
          txtcolor="white"
          header="Raw Data"
          //title="title"
          //text="text"
          body={
            <>
            <h5>Users:</h5>
            <div> {JSON.stringify(msg)} </div>
            <br/>
            <h5>Transactions:</h5>
            <div> {JSON.stringify(balanceMsg)} </div>
            <br/>
            <h5>From MongoDB:</h5>
            <div> {data} </div>
            </>
          }
      />
      </div>

    </div>
  </div>
  )
}