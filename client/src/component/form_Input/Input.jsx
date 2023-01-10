import React from 'react';

function Input (props){
    return(
        <div className='formInput'>
        <input 
        type={props.type} 
        placeholder={props.placeholder} 
        name={props.name} 
        id={props.name}
        />
        </div>
    )
}
export default Input;