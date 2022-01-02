import React, { useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Select from "react-select";
import { ErrorMessage } from 'formik';
import TextField from './TextField';
import fetch from './network/fetchTimeout';
import { request } from './network/RequestType';

const options = [
    { value: "Individual", label: "Individual" },
    { value: "Business", label: "Business" }
];

const Users = () => {
    const validate = Yup.object({
        firstName: Yup.string()
            .required('Firstname require').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        lastName: Yup.string()
            .required('Lastname required').matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed for Lastname "),
        email: Yup.string().email('Email is invalid')
            .required('Email required'),
        phone: Yup.string().max(10, "Must to 10 characters max")
            .required('Type require').matches(/^[0-9]/, "Only Numbers are allowed for this field "),
        type: Yup.string().max(10, "Must to 10 digit only")
            .required('Type require'), 

    })

    const callAPI = (values) => {
        const json = {
            name: values.firstName,
            lastname: values.lastname,
            email: values.email,
            type: values.type,
            phone:values.phone
        }
        fetch('http://ip-api.com/json', request("POST", json), 5000) // throw after max 5 seconds timeout error
            .then((result) => {
                alert('User created successfully..')
            })
            .catch((e) => {
                console.log(e)
                alert('Bad Request')
            })
    }

    const onChangeType = (text, formik) => {
        formik.values.type = text.value
    }
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                type: '',
                phone:''
            }}
            validationSchema={validate}
            onSubmit={(values) =>
                callAPI(values)
            }
        >
            {fomrik => {
                return (

                    <div className="container">
                        <div className="main"><h1 className="my-4 font-weight-bold.display-4">Add User</h1></div>
                        <Form>
                            <TextField name="firstName" type="text" label="First Name" />
                            <TextField name="lastName" type="text" label="Last Name" />
                            <TextField name="email" type="email" label="Email" />
                            <TextField name="phone" type="text" label="Mobile" />
                            <div className="type">
                                <Select
                                    name="type"
                                    options={options}
                                    onChange={(text) => onChangeType(text, fomrik)}
                                />
                                <ErrorMessage component="div" name="type" className="error" />
                            </div>
                            <div className="main"><button className="btn btn-dark mt-3" type="submit">Submit</button></div>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

export default Users;