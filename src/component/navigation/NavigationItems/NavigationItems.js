import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {/* <NavigationItem link="/selectbox">selectbox</NavigationItem> */}
    <NavigationItem link="/allpost">Blogs</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/login">Login</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}

    {props.isAuthenticated ? (
      <NavigationItem link="/newpost">NewPost</NavigationItem>
    ) : null}

    {props.isAuthenticated ? (
      <NavigationItem link="/post">MyBlogs</NavigationItem>
    ) : null}
  </ul>
);

export default navigationItems;
