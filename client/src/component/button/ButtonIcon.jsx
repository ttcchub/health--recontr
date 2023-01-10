import React from 'react';
import classes from './ButtonIcon.module.css'

const ButtonIcon = (props) => {
  return (
    <button className={classes.cards} 
    type='submit'
    onClick={props.onClick}
    >
     <span className='btnIcon'><i className={props.icon} style={{fontSize:'50px'}}/>
    </span>
    <span className='btnText'>{props.children}</span>
   
    </button>
    
  )
}

export default ButtonIcon
