import React, { useContext, useState } from 'react'
import Card from './context'
import { UserContext } from './context'
import { useFormik } from 'formik';
import uuidv4 from '/node_modules/uuid/dist/v4'

// VALIDATION ---------------------------
const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  return errors;
};

// CREATE ACCOUNT COMPONENT ------------------------
export default function CreateAccount() {

  const [show, setShow]         = useState(true);
  const ctx = useContext(UserContext);  

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit:
      values => {
        //alert('Submitted');
        setShow(false);
        formik.resetForm();
        ctx.users.push({id: uuidv4(), name: values.name, email: values.email, password: values.password, balance:100})
        //const url = `http://localhost:3001/account/create/${values.name}/${values.email}/${values.password}`;
        const url = `/account/create/${values.name}/${values.email}/${values.password}`;
        (async () => {
          var res = await fetch (url);
          var data = await res.json();
          console.log(data);
        })();
      },
  });

  function clearForm(){
    setShow(true);
  }

  return (
    <div className="container">
    <br/>
    <Card
    bgcolor="dark"
    txtcolor="white"
    header="Create Account"
    body={show ? (
      <>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">Name</label><br/>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control" 
            placeholder="Enter Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
          <br/>
          <label htmlFor="email">Email Address</label><br/>
          <input
            id="email"
            name="email"
            type="text"
            className="form-control" 
            placeholder="Enter Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
          <br/>
          <label htmlFor="password">Password</label><br/>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control" 
            placeholder="Enter Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
          <br/>
          <br/>
          <button type="submit" className="btn btn-light" disabled={!(formik.isValid && formik.dirty)} >Submit</button>
        </form>
      </>
    ):(
      <>
        <h5 className="text-warning">Account Successfully Created!</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
      </>
    )}
    />
    </div>
  )
}
