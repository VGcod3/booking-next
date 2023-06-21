'use client'

import { Fragment, useState, useEffect, ReactNode } from 'react'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import InputField from '../../components/ui/InputFiled'
import { Button } from '@/components/ui/button';

import type { User } from '@/api/user/userTypes';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/navigation'
import { setUser } from "@/store/userSlice";

import ModalDestructive from '@/components/ui/ModalDestructive';

import UserBookings from '@/components/UserBookings'

import { PatchRequest, } from '@/api/user/userTypes';
import { usePatchUserMutation, useDeleteUserMutation } from '@/api/user/userApi';

import { useAppDispatch } from '../../hooks'


const imageUrl = 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80'

import { useSelector } from 'react-redux';
import { clearUser } from "@/store/userSlice"


function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email address'),
    phone: Yup.string()
        .matches(
            /^[\d-()+ ]+$/,
            'Invalid phone number'
        ),
    password: Yup.string()
});


interface profileFieldProps {
    children: ReactNode;
    type?: string;
    placeholder?: string;
    name: string;
}

const ProfileField = ({ children, type = 'text', name, placeholder = `Ener your ${name}` }: profileFieldProps) => {

    return (
        <div className="flex align-bottom justify-between gap-2 w-full">
            <div className="h-full w-auto flex align-bottom">

                {children}
            </div>
            <div className="w-full flex-1">
                <div className="flex justify-between">
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                        {name}
                    </label>
                    <span className="text-sm text-gray-500" id={name}>
                        Optional
                    </span>
                </div>
                <div className="mt-2 flex align-middle gap-10 justify-between ">
                    <Field
                        type={type}
                        name={name}
                        id={name}
                        disabled={name == 'password'}
                        // {name == 'password' ? disabled : null}
                        className="block w-full rounded-md border-gray-300 shadow-sm transition-all duration-200 ease-in-out focus:border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder={placeholder}
                        aria-describedby={name}
                    />
                </div>
            </div>
        </div>
    )
}


export default function Profile() {
    const isLoggedIn = useSelector((state) => state.user.isLogged);

    const [openDestructiveModal, setOpenDestructiveModal] = useState(false);


    const [availableToHire, setAvailableToHire] = useState(true)
    const [privateAccount, setPrivateAccount] = useState(false)
    const [allowCommenting, setAllowCommenting] = useState(true)
    const [allowMentions, setAllowMentions] = useState(true)

    const dispatch = useAppDispatch()

    const [patch] = usePatchUserMutation();

    const router = useRouter();


    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/");
        }
    }, [])

    const user: User = useSelector((state) => state.user);

    const { password } = user?.data;


    const initialValues: PatchRequest = { password, ...user.data };




    const handleSubmit = async (values: SignUpRequest) => {

        const mergedObject = { ...user.data };

        for (const key in values) {
            if (values[key] !== null && values[key] !== '') {
                mergedObject[key] = values[key];
            }
        }

        patch({
            email: mergedObject.email,
            firstName: mergedObject.firstName,
            lastName: mergedObject.lastName,
            username: mergedObject.username,
            phone: mergedObject.phone,
            password: password
        })
            .unwrap()
            .then((updatedUser) => {
                dispatch(setUser({ ...updatedUser, password }));
            })
            .catch(e => (console.error('Update failed:', e)));

    };


    const handleDelete = () => {
        console.log('Delete');
        setOpenDestructiveModal(true);
    }


    const handleLogout = () => {
        router.push('/');
        dispatch(clearUser(null));

    }

    return (
        <div>
            <ModalDestructive open={openDestructiveModal} setOpen={setOpenDestructiveModal} />

            <Disclosure as="div" className="relative overflow-hidden bg-indigo-700 pb-32">
                {({ open }) => (
                    <>
                        <div
                            aria-hidden="true"
                            className={classNames(
                                open ? 'bottom-0' : 'inset-y-0',
                                'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0'
                            )}
                        >
                            <div className="absolute inset-0 flex">
                                <div className="h-full w-1/2" style={{ backgroundColor: '#0a527b' }} />
                                <div className="h-full w-1/2" style={{ backgroundColor: '#065d8c' }} />
                            </div>
                            <div className="relative flex justify-center">
                                <svg
                                    className="flex-shrink-0"
                                    width={1750}
                                    height={308}
                                    viewBox="0 0 1750 308"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
                                    <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
                                    <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                                    <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
                                </svg>
                            </div>
                        </div>
                        <header className="relative py-16">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Profile settings</h1>
                            </div>
                        </header>
                    </>
                )}
            </Disclosure>
            <div className="relative -mt-32">
                <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="w-full flex p-10 justify-between items-end">
                            <h2 className="text-7xl font-bold font-mono  text-gray-800">Redact profile</h2>
                            <img className="h-60 w-60 rounded-full" src={imageUrl} alt="" />
                        </div>
                        <hr />
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            <div className="p-4">
                                <Form className="space-y-4">
                                    <h3 className="text-indigo-600 text-thin text-4xl text-bold text-center">
                                        {user?.data?.username}
                                    </h3>
                                    <ProfileField name='firstName'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.8} stroke="currentColor" className="h-10  w-10 m-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </ProfileField>
                                    <ProfileField name='lastName'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.8} stroke="currentColor" className="h-10  w-10 m-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </ProfileField>
                                    <ProfileField name='email'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.8} stroke="currentColor" className="h-10  w-10 m-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </ProfileField>
                                    <ProfileField name='phone'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.8} stroke="currentColor" className="h-10  w-10 m-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </ProfileField>
                                    <ProfileField name='password'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.8} stroke="currentColor" className="h-10  w-10 m-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </ProfileField>

                                    <hr className="my-4" />

                                    <div className="divide-y divide-gray-200 ">
                                        {/* Privacy section */}
                                        <div className="divide-y divide-gray-200 pt-6">
                                            <div className="px-4 sm:px-6">
                                                <div>
                                                    <h2 className="text-lg font-medium leading-6 text-gray-900">Privacy</h2>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                                                    </p>
                                                </div>
                                                <ul role="list" className="mt-2 divide-y divide-gray-200">
                                                    <Switch.Group as="li" className="flex items-center justify-between py-4">
                                                        <div className="flex flex-col">
                                                            <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                                Available to hire
                                                            </Switch.Label>
                                                            <Switch.Description className="text-sm text-gray-500">
                                                                Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                                            </Switch.Description>
                                                        </div>
                                                        <Switch
                                                            checked={availableToHire}
                                                            onChange={setAvailableToHire}
                                                            className={classNames(
                                                                availableToHire ? 'bg-indigo-500' : 'bg-gray-200',
                                                                'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    availableToHire ? 'translate-x-5' : 'translate-x-0',
                                                                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                )}
                                                            />
                                                        </Switch>
                                                    </Switch.Group>
                                                    <Switch.Group as="li" className="flex items-center justify-between py-4">
                                                        <div className="flex flex-col">
                                                            <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                                Make account private
                                                            </Switch.Label>
                                                            <Switch.Description className="text-sm text-gray-500">
                                                                Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
                                                            </Switch.Description>
                                                        </div>
                                                        <Switch
                                                            checked={privateAccount}
                                                            onChange={setPrivateAccount}
                                                            className={classNames(
                                                                privateAccount ? 'bg-indigo-500' : 'bg-gray-200',
                                                                'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    privateAccount ? 'translate-x-5' : 'translate-x-0',
                                                                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                )}
                                                            />
                                                        </Switch>
                                                    </Switch.Group>
                                                    <Switch.Group as="li" className="flex items-center justify-between py-4">
                                                        <div className="flex flex-col">
                                                            <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                                Allow commenting
                                                            </Switch.Label>
                                                            <Switch.Description className="text-sm text-gray-500">
                                                                Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                                                            </Switch.Description>
                                                        </div>
                                                        <Switch
                                                            checked={allowCommenting}
                                                            onChange={setAllowCommenting}
                                                            className={classNames(
                                                                allowCommenting ? 'bg-indigo-500' : 'bg-gray-200',
                                                                'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    allowCommenting ? 'translate-x-5' : 'translate-x-0',
                                                                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                )}
                                                            />
                                                        </Switch>
                                                    </Switch.Group>
                                                    <Switch.Group as="li" className="flex items-center justify-between py-4">
                                                        <div className="flex flex-col">
                                                            <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                                                Allow mentions
                                                            </Switch.Label>
                                                            <Switch.Description className="text-sm text-gray-500">
                                                                Adipiscing est venenatis enim molestie commodo eu gravid
                                                            </Switch.Description>
                                                        </div>
                                                        <Switch
                                                            checked={allowMentions}
                                                            onChange={setAllowMentions}
                                                            className={classNames(
                                                                allowMentions ? 'bg-indigo-500' : 'bg-gray-200',
                                                                'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    allowMentions ? 'translate-x-5' : 'translate-x-0',
                                                                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                )}
                                                            />
                                                        </Switch>
                                                    </Switch.Group>
                                                </ul>
                                            </div>

                                        </div>

                                    </div>


                                    <div className="flex w-full justify-end">
                                        <Button onClick={handleDelete} className='rounded-none rounded-l-md hover:shadow-xl' variant='destructive'>
                                            Delete account
                                        </Button>

                                        <Button onClick={handleDelete}
                                            variant="secondary" className='rounded-none hover:shadow-xl' >
                                            Log out
                                        </Button>

                                        <Button className='rounded-none rounded-r-md hover:shadow-xl' onClick={handleSubmit}>
                                            Update data
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Formik>
                    </div>

                </div>
            </div>


            <UserBookings />
        </div>
    )
}