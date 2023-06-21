'use client'
import './globals.css'
import { Lato } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Provider } from 'react-redux'

import DotLoader from 'react-spinners/DotLoader';
import { PersistGate } from 'redux-persist/integration/react';


import { persistor, store } from '@/store/store'

const lato = Lato({ weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'Room Booking',
  description: 'Book a room best for you',
}


const Loader = () => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <DotLoader color="#6f4dff" size={45} speedMultiplier={2} />
    </div>
  )
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" >
      <body className={`${lato.className} overflow-x-hidden flex flex-col h-screen justify-between`}>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
