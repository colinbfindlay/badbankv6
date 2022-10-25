import React, { useContext, useState } from 'react'
import Card from './context'
import { BalanceContext } from './context'
import { useFormik } from 'formik';
import TransactionList from './TransactionList'
import uuidv4 from '/node_modules/uuid/dist/v4'


// DEPOSIT COMPONENT -------------------------
export default function Withdraw() {

  const [show, setShow] = useState(true);
  const ctxB = useContext(BalanceContext);


  // VALIDATION ---------------------------
  const validate = values => {
    const errors = {};

    if (!values.amount) {
      errors.amount = 'Required';
    } else if (isNaN(values.amount)) {
      errors.amount = 'Must be a Number';
    }else if (values.amount < 0) {
      errors.amount = 'Must be a Positive Number';
    }else if ((sum - values.amount) < -500) {
      errors.amount = 'Max $500 Overdraft Allowed';
    }

    if (!values.description) {
      errors.description = 'Required';
    } else if (values.amount.length > 15) {
      errors.amount = 'Must be 15 characters or less';
    }

    return errors;
  };


  const formik = useFormik({
    initialValues: {
      amount: '',
      description: '',
      isDeposit: '',
    },
    validate,
    onSubmit:
      values => {
        //alert('Submitted');
        setShow(false);
        formik.resetForm();
        ctxB.balance.push({id: uuidv4(), amount: -Math.abs(values.amount), description: values.description, isDeposit: false})
      },
  });

  function clearForm(){
    setShow(true);
  }

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


  return (
    <div className="container">
    <br/>
    <Card
    bgcolor="dark"
    txtcolor="light"
    header="Withdraw Form"
    body={show ? (
      <>
        
        <h5 className={balCol(sum)}>Current Balance: ${sum}</h5>
        <div className={balCol(sum)}>Overdraft: {balMsg(sum)}</div>
        <div>Total Transactions: {ctxB.balance.length}</div>
        Transaction History:
        <TransactionList ctxB={ctxB}/>
        <br/>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="amount">Withdraw Amount</label><br/>
          <input
            id="amount"
            name="amount"
            type="text"
            className="form-control" 
            placeholder="Enter Amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.touched.amount && formik.errors.amount ? (
            <div className="text-danger">{formik.errors.amount}</div>
          ) : null}
          <br/>
          <label htmlFor="description">Withdraw Description</label><br/>
          <input
            id="description"
            name="description"
            type="text"
            className="form-control" 
            placeholder="Enter Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-danger">{formik.errors.description}</div>
          ) : null}
          <br/>
          <br/>
          <button type="submit" className="btn btn-light" disabled={!(formik.isValid && formik.dirty)} >Submit</button>
        </form>
      </>
    ):(
      <>
        <h5 className={balCol(sum)}>Current Balance: ${sum}</h5>
        <div className={balCol(sum)}>Overdraft: {balMsg(sum)}</div>
        <div>Total Transactions: {ctxB.balance.length}</div>
        Transaction History:
        <TransactionList ctxB={ctxB}/>
        <br/>
        <h5 className="text-warning">Withdraw Successful!</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>Make another Withdraw</button>
      </>
    )}
    />
    </div>
  )
}

