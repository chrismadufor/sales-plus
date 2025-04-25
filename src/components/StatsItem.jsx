import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from './Spinner'

export default function StatsItem({loading, title, value, icon}) {
  return (
    <div className='bg-white border border-gray-300 rounded-md px-5 py-5'>
              <p className=''>{title}</p>
              <div className='flex items-center justify-between mt-5'>
                <h1 className='text-2xl font-semibold'>{loading ? <Spinner size={"sm"} /> : value}</h1>
                <FontAwesomeIcon icon={icon} className='text-xl text-primary' />
              </div>
            </div>
  )
}
