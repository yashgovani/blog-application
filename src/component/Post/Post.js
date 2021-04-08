import React from 'react';
import classes from './Post.module.css';
import Button from '../Button/Button';

const post = (props) => (
  <div className={classes.Post}>
    <div onClick={props.onPostSelect}>
      <p>{props.title}</p>
      <span>
        <p>{props.authorName}</p>
        <p>{props.blogType}</p>
      </span>
    </div>
    <span>
      {props.isAuth ? (
        <Button clicked={props.clicked} btnType="Danger">
          DELETE
        </Button>
      ) : null}
      {props.isAuth ? (
        <Button clicked={props.onUpdate} btnType="Success">
          UPDATE
        </Button>
      ) : null}
    </span>
  </div>
);

export default post;
