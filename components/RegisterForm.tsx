'use client'
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useSignUpMutation } from '@/api/user/userApi';
import { setUser } from "@/store/userSlice";
import { useRouter } from 'next/navigation'
import { useAppDispatch } from "../hooks";
import InputField from './ui/InputFiled';

import { SignUpRequest, User } from '@/api/user/userTypes';
import { Button } from './ui/button';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
        .matches(
            /^[\d-()+ ]+$/,
            'Invalid phone number'
        )
        .required('Phone number is required'),
    password: Yup.string().required('Password is required')
});

const initialValues: SignUpRequest = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: ''
};

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const [signUp] = useSignUpMutation(); // Replace 'useSignUpMutation' with the actual hook


    const handleSubmit = async ({ username, email, firstName, lastName, phone, password }: SignUpRequest) => {
        // Call the signUp mutation function with form values
        signUp({ username, email, firstName, lastName, phone, password })
            .unwrap()
            .then((user) => {
                dispatch(setUser({ password, ...user }));
                router.push('/');
            })
            .catch(e => (console.error('Registration failed:', e)))
    };



    return (
        <div className="max-w-md mx-auto">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="space-y-4">
                    <InputField name="firstName" label='First Name'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </InputField>
                    <InputField name="lastName" label='Last Name'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </InputField>
                    <InputField name="username" label='Username'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </InputField>
                    <InputField name="email" type='email' label='Email Address'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </InputField>
                    <InputField name="phone" label='Phone number'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                    </InputField>
                    <InputField name="password" type='password' label='Password' className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </InputField>

                    <div className="flex items-center justify-between">

                        <div className="text-sm">
                            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Already have an account?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            size='sm'
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default RegisterForm;
