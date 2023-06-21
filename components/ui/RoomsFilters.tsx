'use client'

import { Disclosure, } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

import * as Slider from '@radix-ui/react-slider';

interface RoomFiltersProps {
    filters: {
        id: string
        name: string
        options: {
            value: string
            label: string
            checked: boolean
        }[]
    }[],
    priceFilter: {
        id: string;
        name: string;
        min: number;
        max: number;
        value: number[]
    },
    priceValue: number[],
    handlePriceChange: (newValues: number[]) => void

}

export default function RoomFilters({ filters, priceFilter, priceValue, handlePriceChange }: RoomFiltersProps) {

    return (
        <form className="hidden lg:block">
            <Disclosure as="div" key={'mobilePrice'} className="border-b border-gray-200 py-3">
                {({ open }) => (
                    <>
                        {<Disclosure.Button className="rounded flex w-full round items-center justify-between bg-white p-4 text-sm text-gray-400 hover:text-gray-500 focus:ring-indigo-500active:shadow-indigo-500 focus:outline-offset-4">
                            <h3 className="text-md font-medium text-gray-900">Price</h3>
                            <span className="ml-6 flex items-center">
                                {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </span>
                        </Disclosure.Button>}
                        <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                                <Slider.Root
                                    defaultValue={priceValue}
                                    onValueChange={handlePriceChange}
                                    step={1}
                                    min={priceFilter.min}
                                    max={priceFilter.max}
                                    className="relative flex  rounded-lg  items-center select-none touch-none w-full h-5"
                                >
                                    <Slider.Track className=" bg-gray-200 relative grow rounded-full h-1" />
                                    <Slider.Range className="absolute bg-indigo-500 rounded-full h-1" />

                                    <Slider.Thumb
                                        className="block w-5 h-5 bg-white rounded-full outline-none shadow-[0_0_15px_5px] shadow-gray-300 focus:ring-indigo-500focus:outline-2"
                                        aria-label="Volume"
                                    />

                                    <Slider.Thumb
                                        className="block w-5 h-5 bg-white rounded-full outline-none shadow-[0_0_15px_5px] shadow-gray-300 focus:ring-indigo-500focus:outline-2"
                                        aria-label="Volume"
                                    />

                                </Slider.Root>
                                <div className="mt-2 flex justify-between text-sm text-gray-500">
                                    <span>${priceValue[0]}</span>
                                    <span>${priceValue[1]}</span>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}

            </Disclosure>

            {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-3">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white p-4 text-sm text-gray-400 hover:text-gray-500 focus:ring-indigo-500active:shadow-indigo-500 focus:outline-offset-4">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                    {section.options.map((option, optionIdx) => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                id={`filter-${section.id}-${optionIdx}`}
                                                name={`${section.id}[]`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                defaultChecked={option.checked}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label
                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                className="ml-3 text-sm text-gray-600"
                                            >
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ))}
            <div className="flex justify-center py-4">
                <button type="submit" className='w-full py-3 rounded-lg text-white bg-indigo-500  focus:ring-indigo-500focus:outline-offset-4'>Apply Filter</button>
            </div>
        </form>
    )
}