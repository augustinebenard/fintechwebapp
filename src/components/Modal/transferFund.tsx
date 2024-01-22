import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
import React from 'react'

const TransferFund = () => {
  return (
    <>
            <button className="sm:mt-0 flex gap-2 items-center rounded bg-secondary-500 py-2 px-6 w-[132px]">
              <span className="text-sm font-medium text-white">Tranfer</span>
              <ChevronDoubleRightIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </button>
    </>
  )
}

export default TransferFund