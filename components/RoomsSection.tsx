'use client'

import { useState } from 'react'


import MobileFilterDialog from '@/components/ui/MobileFilterDialog'
import SortingButtons from '@/components/ui/SortingButtons'
import RoomsFilters from '@/components/ui/RoomsFilters';

import GoodsGrid from '@/components/GoodsGrid'
import GoodsList from '@/components/GoodsList'

import Search from '@/components/ui/Search'

const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'house', label: 'house', checked: true },
            { value: 'apartment', label: 'apartment', checked: true },
            { value: 'hotel Room', label: 'hotel-room', checked: true },
            { value: 'cottage', label: 'cottage', checked: true },
        ],
    },
    {
        id: 'visitors',
        name: 'Visitors',
        options: [
            { value: '1 adult', label: '1 adult', checked: true },
            { value: '2 adults', label: '2 adults', checked: true },
            { value: '2 adults, 1 child', label: '2 adults, 1 child', checked: true },
            { value: '2 adults, 2 children', label: '2 adults, 2 children', checked: true },
            { value: '2 adults, 3 children', label: '2 adults, 3 children', checked: true },
            { value: '6+ people', label: '6+ people', checked: true },
        ],
    },
]

const priceFilter = {
    id: 'price',
    name: 'Price',
    min: 0,
    max: 1000,
    value: [0, 1000],
}

export default function RoomsSection() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [showFullRoomsData, setShowFullRoomsData] = useState(false)

    const [priceValue, setPriceValue] = useState(priceFilter.value)

    const handlePriceChange = (newValues: number[]) => {
        setPriceValue(newValues)
        // Handle the price value change here
        // Update the state or perform any necessary actions
    }

    return (
        <div className="bg-gray-50">
            <>
                <MobileFilterDialog open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} filters={filters} priceValue={priceValue} priceFilter={priceFilter} handlePriceChange={handlePriceChange} />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <div className='sm:flex-col gap-3 md:flex'>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Choose best room</h1>
                            <Search />
                        </div>

                        <SortingButtons showFullRoomsData={showFullRoomsData} setShowFullRoomsData={setShowFullRoomsData} setMobileFiltersOpen={setMobileFiltersOpen} />

                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 pb-24 pt-6">

                        <RoomsFilters filters={filters} priceFilter={priceFilter} priceValue={priceValue} handlePriceChange={handlePriceChange} />

                        {/* Product grid */}
                        <div className="lg:col-span-3">
                            {showFullRoomsData ? <GoodsGrid /> : <GoodsList />}
                        </div>
                    </div>

                </div>
            </>
        </div>
    )
}
