'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DatePickerWithRange } from '@/components/ui/DatePicker';
import BookedModal from '@/components/BookedModal';
import ErrorAlert from '@/components/ui/ErrorAlert';
import ReviewsBlock from '@/components/ReviewsBlock';
import { Button } from '@/components/ui/button';

const RoomPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const [showError, setShowError] = useState(false)

  useEffect(() => {
    let alertId: any = null;

    if (showError) {
      alertId = setTimeout(() => {
        setShowError(false);
      }, 2500);
    }

    return () => {
      clearTimeout(alertId);
    };
  }, [showError]);

  const handleShowError = () => {
    setShowError(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
      <section className="container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Image
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Room photo"
              className="w-full h-92 object-cover rounded"
              width={2340}
              height={650}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Deluxe Room</h1>
            <div className="text-gray-600 mb-4">$150 / night</div>
            <span className="bg-gray-300 rounded text-sm text-black py-1 px-2 font-semibold">
              2 adults, 1 child
            </span>
            <p className="text-gray-700 text-sm my-2">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={handleBookNow} className='flex flex-col gap-6 container mx-auto'>

        <h2 className="text-3xl text-gray-700 my-4">Book now</h2>

        <DatePickerWithRange />

        <Button type='submit' className='w-full'>Book Now</Button>
      </form>


      <div className="container mx-auto flex flex-col mt-4">


        <Button variant="destructive" onClick={handleShowError} /* className='w-full' */>Show error</Button>
      </div>

      <ReviewsBlock />


      {showError && <ErrorAlert errorMessage='Room booking failed' errorTitle='Failed booking' />}

      <BookedModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingRange="June 20 - July 10, 2023"
      />
    </div>
  );
};

export default RoomPage;
