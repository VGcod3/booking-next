'use client'
import { useGetUserSearchRentsMutation } from "@/api/user/userApi"
import { useAppDispatch } from '../hooks'
import { useSelector } from 'react-redux';


import { useEffect, useState } from 'react'
import { RootState } from "@/store/store";

/* This example requires Tailwind CSS v2.0+ */
const orders = [
    {
        number: '4376',
        status: 'Delivered on January 22, 2023',
        href: '#',
        invoiceHref: '#',
        products: [
            {
                id: 1,
                name: 'Machined Brass Puzzle',
                href: '#',
                price: '$95.00',
                color: 'Brass',
                size: '3" x 3" x 3"',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-07-product-01.jpg',
                imageAlt: 'Brass puzzle in the shape of a jack with overlapping rounded posts.',
            },
            // More products...
        ],
    },
    // More orders...
]

export default function UserBookings() {
    const user = useSelector((state: RootState) => state.user);

    const username = user?.data?.username;
    const password = user?.data?.password;

    const [getRents, { data, error, isLoading }] = useGetUserSearchRentsMutation();

    useEffect(() => {
        getRents({ username, password })
            .unwrap()
            .then(data => console.log(data))
            .catch(error => console.log(error))
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
                <div className="max-w-xl">
                    <h1 id="your-orders-heading" className="text-3xl font-bold tracking-tight text-gray-900">
                        Your Bookings
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Check the status of recent bookings and discover similar rooms.
                    </p>
                </div>

                <div className="mt-12 space-y-16 sm:mt-16">
                    {data?.results.map((booking, i) => (
                        <section key={i} aria-labelledby={`booking-${i}-heading`}>
                            <div className="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4">
                                <h2 id={`booking-${i}-heading`} className="text-lg font-medium text-gray-900 md:flex-shrink-0">
                                    Booking #{i + 1}
                                </h2>
                                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                                    <p className="text-sm font-medium text-gray-500">Room: {booking.room.name}</p>
                                    <div className="flex text-sm font-medium">
                                        <p className="text-indigo-600">
                                            Start Time: {booking.time_start}
                                        </p>
                                        <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                                            <p className="text-indigo-600">
                                                End Time: {booking.time_end}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:w-40 sm:flex-none">
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                                >
                                    Book again
                                </button>
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                                >
                                    Book another room
                                </button>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}
