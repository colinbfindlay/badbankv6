import React from 'react'
import { NavLink } from 'react-router-dom';


export default function NavBar() {
  return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">BadBank</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Click to go to Home Page" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Click to Create New Account">
                <a className="nav-link" href="#/CreateAccount/">Create Account</a>
              </li>
              <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Click to Deposit">
                <a className="nav-link" href="#/deposit/">Deposit</a>
              </li>
              <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Click to Withdraw">
                <a className="nav-link" href="#/withdraw/">Withdraw</a>
              </li>
              <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Click to view All Data">
                <a className="nav-link" href="#/alldata/">All Data</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </>
  )
}



