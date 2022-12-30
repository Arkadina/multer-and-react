import React, { useState } from "react";

import { Formik, Field, ErrorMessage, Form, useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;

    h1 {
        justify-self: center;
    }

    label {
        color: #484848;
        font-weight: 600;
    }

    input[type="text"],
    input[type="email"] {
        margin: 10px 0;
        outline: none;
        border: 1px solid #929292;
        height: 20px;
        border-radius: 4px;
        padding: 8px 14px;
        background-color: #e9e9e9;
    }

    input[type="file"] {
        margin: 10px 0;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }

    input[type="checkbox"] {
        margin-left: 10px;
        border: none;
    }

    .warning-alert {
        font-size: 12px;
        color: 484848;
        font-weight: 600;
    }

    .select-input {
        margin: 10px 0;
        outline: none;
        border-radius: 4px;
        padding: 8px 14px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border: 1px solid #484848;

        option {
            font-size: 14px;
        }
    }
`;

const FormContainer = styled.div`
    width: 400px;

    button {
        width: 100%;
        font-family: "Roboto", sans-serif;
        border: none;
        background-color: #484848;
        font-weight: 600;
        color: #fff;
        border-radius: 4px;
        height: 40px;
        font-size: 14px;
        cursor: pointer;
    }
`;

function ImageForm() {
    const [imageField, setImageField] = useState(null);
    return (
        <FormContainer>
            <Formik
                className="formik"
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    languages: "",
                    state: false,
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    lastName: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    languages: Yup.mixed().required(),
                    state: Yup.boolean().oneOf([true, false]).required(),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                    axios
                        .post(
                            "http://localhost:3000/",
                            {
                                img: imageField,
                                values,
                            },
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        )
                        .then((res) => {
                            console.log(res.data);
                        });
                }}
            >
                <Form>
                    <InputContainer>
                        <Field
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                        />
                        <ErrorMessage
                            name="firstName"
                            component="div"
                            className="warning-alert"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Field
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                        />
                        <ErrorMessage
                            name="lastName"
                            component="div"
                            className="warning-alert"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Field name="email" type="email" placeholder="Email" />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="warning-alert"
                        />
                    </InputContainer>

                    <InputContainer>
                        <label htmlFor="languages">Languages</label>
                        <Field
                            placeholder="Languages"
                            type="text"
                            name="languages"
                            as="select"
                            size="3"
                            multiple={true}
                            className="select-input"
                        >
                            <option value="portuguese">Portuguese</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </Field>
                        <ErrorMessage
                            name="languages"
                            component="div"
                            className="warning-alert"
                        />
                    </InputContainer>

                    <InputContainer>
                        <div>
                            <label htmlFor="state">Public</label>
                            <Field
                                type="checkbox"
                                name="state"
                                className="form-check-input"
                            />
                        </div>
                    </InputContainer>

                    <InputContainer>
                        <label htmlFor="file">Upload image</label>
                        <input
                            name="img"
                            type="file"
                            required
                            accept="image/*"
                            onChange={(event) => {
                                setImageField(event.currentTarget.files[0]);
                            }}
                        />
                    </InputContainer>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </FormContainer>
    );
}

export default ImageForm;
