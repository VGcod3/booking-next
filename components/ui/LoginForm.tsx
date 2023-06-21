'use client'
import axios from 'axios';

import { useRouter } from 'next/navigation'
import { useAppDispatch } from "../../hooks";
import { setUser } from "@/store/userSlice";
import { SignInRequest } from '@/api/user/userTypes'

import { useSelector } from 'react-redux';

import Link from "next/link"

import { Formik, Form, Field, ErrorMessage, ErrorMessageProps } from 'formik';
import * as Yup from "yup";

const validationSchema = Yup.object({
    username: Yup.string().min(5).required("Enter username"),
    password: Yup.string().required("Enter password").matches(/^[^\s]+$/, "There should be no spaces")
});

const initialValues = {
    username: "Johndoee",
    password: "Secret"
};

function getHeaders(username: string, password: string) {
    const credentials = btoa(`${username}:${password}`);
    return {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
    };
};

export const fetcher = async (url: string, username: string, password: string) => {

    const res = await axios.get(url, {
        headers: getHeaders(username, password)
    });

    if (res.status !== 200) {
        throw new Error("Error fetching data");
    }

    return res.data;
}

export default function LoginForm() {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const user = useSelector((state) => state.user)



    const handleLogin = async (values: SignInRequest) => {
        const API_BASE = process.env.API_BASE || 'http://localhost:8000/api/v1/';
        try {
            const res = await fetcher(`${API_BASE}user/`, values.username, values.password)

            dispatch(setUser({ password: values.password, ...res }));
            router.push('/');

        } catch (error) {
            console.error(error)
        }

    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {(formik) => (
                <Form className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-1">
                            <Field
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Do not have an account?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign in
                        </button>
                    </div>

                </Form>
            )}
        </Formik>
    )
}