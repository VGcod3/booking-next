'use client'

import { Fragment } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

import * as Slider from '@radix-ui/react-slider';

interface MobileFilterDialogProps {
    open: boolean;
    onClose: () => void;
    filters: {
        id: string
        name: string
        options: {
            value: string
            label: string
            checked: boolean
        }[]
    }[];
    priceFilter: {
        id: string;
        name: string;
        min: number;
        max: number;
        value: number[]
    };
    priceValue: number[];
    handlePriceChange: (newValues: number[]) => void;
}

function MobileFilterDialog({ open, onClose, filters, priceFilter, priceValue, handlePriceChange }: MobileFilterDialogProps) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className="relative z-40 lg:hidden" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    onClick={onClose}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <form className="mt-4 border-t border-gray-200">
                                <Disclosure as="div" key={'price'} className="border-b border-gray-200 py-6 px-4">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="rounded flex w-full items-center justify-between bg-white p-3 text-sm text-gray-400 hover:text-gray-500 focus:ring-indigo-500active:shadow-indigo-500 focus:outline-offset-4">
                                                    <h3 className="text-md font-medium text-gray-900">Price</h3>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
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
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6 px-4">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="rounded flex w-full items-center justify-between bg-white p-3 text-sm text-gray-400 hover:text-gray-500 focus:ring-indigo-500active:shadow-indigo-500 focus:outline-offset-4">
                                                        <h3 className="font-medium text-gray-900">{section.name}</h3>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="pt-6 space-y-4">
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
                                <div className="flex justify-center p-4">
                                    <button type="submit" className='w-full py-3 rounded-lg text-white bg-indigo-500  focus:ring-indigo-500focus:outline-offset-4'>Apply Filter</button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default MobileFilterDialog
