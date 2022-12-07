import React from 'react'
// import { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { connect } from 'react-redux';

import "../css/login.scss";
import NavBar from "../Nav/NavBar";
export default function SignUp() {
  return (
    <div>
    <NavBar />

    <div className="App">
  <div className="appAside" />
  <div className="appForm">
    <div className="pageSwitcher">
      <NavLink
        to="/sign-in"
        activeClassName="pageSwitcherItem-active"
        className="pageSwitcherItem"
      >
        Sign In
      </NavLink>
      <NavLink
        exact
        to="/sign-up"
        activeClassName="pageSwitcherItem-active"
        className="pageSwitcherItem"
      >
        Sign Up
      </NavLink>
    </div>

    <div className="formTitle">
    <SignUpForm />
      {/* <NavLink
        exact
        to="/"
        activeClassName="formTitleLink-active"
        className="formTitleLink"
      >
        Sign Up
      </NavLink> */}
    </div>
    

    {/* <Route exact path="/" component={SignUpForm} /> */}
    {/* <Route path="/sign-in" component={SignInForm} /> */}
  </div>
</div>
</div>
  )
}
