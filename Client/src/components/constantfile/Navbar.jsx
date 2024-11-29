import React from 'react'
import {Link} from 'react-router-dom'
import { FaStethoscope } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
        <div className='flex justify-between p-4'>
            <div className='flex items-center gap-2'>
                <b className='text-[#00df9a]'><FaStethoscope size={34} /></b>
                <Link to='/' className='text-base font-semibold md:text-2xl lg:text-3xl'>Mental Health Check-in</Link>
            </div>
            <div>
                <button className='common-button'>
                    <Link to='/login'>Login</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar