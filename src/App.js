import React from "react"
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './navbar'
import Home from './home'
import Deposit from './deposit'
import Withdraw from './withdraw'
import AllData from './alldata'
import CreateAccount from './createaccount'
import { UserContext } from './context'
import { BalanceContext } from './context'
import uuidv4 from '/node_modules/uuid/dist/v4'

function App() {
  return (
   
    <HashRouter>
     <NavBar/>
     <UserContext.Provider value={{users:[{id: uuidv4(), name: 'Colin Findlay', email: 'colin@badbank.com', password: 'secret', balance: 100}]}}>
     <BalanceContext.Provider value={{balance:[{id: uuidv4(), amount: 100, description: 'Welcome Bonus', isDeposit: true}]}}>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/CreateAccount/" element={<CreateAccount/>} />
        <Route path="/deposit/" element={<Deposit/>} />
        <Route path="/withdraw/" element={<Withdraw/>} />
        <Route path="/alldata/" element={<AllData/>} />
      </Routes>
      </BalanceContext.Provider>
     </UserContext.Provider>
    </HashRouter>

  
  )
}

export default App;
