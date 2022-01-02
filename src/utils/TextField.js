
import React, { useState } from "react";
import { ErrorMessage, useField } from 'formik';
import '../App.css';

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="main">
            <div className="mb-2">
                <label htmlFor={field.name}><b>{label}</b></label>
                <input className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} width="1rem" autoComplete="off" {...field} {...props}></input>
                <ErrorMessage component="div" name={field.name} className="error" />
            </div>
        </div>


    )
}
export default TextField;