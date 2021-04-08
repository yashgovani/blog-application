import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <nav>
      <NavigationItems isAuthenticated={props.isAuth} email={props.email} />
      {/* <p>email: {props.email}</p> */}
    </nav>
  </header>
);

export default toolbar;
