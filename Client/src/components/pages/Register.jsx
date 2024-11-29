import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validateField } from '../utils/Validation'


const Register = () => {

    const [regData, setRegData] = useState({
        email:'',
        password:'',
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegData({...regData, [name]: value})

        // Validate the field Dynamically
        const errormessage = validateField(name, value);
        setErrors({...errors, [name]: errormessage})
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate all fields
        const newErrors = {};
        Object.keys(regData).forEach((key) => {
            const errormessage = validateField(key, regData[key]);
            if(errormessage){
                newErrors[key] = errormessage;
            }
        })

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            alert('please fix the errors before submitting')
            return;
        }
        try {
            const url = import.meta.env.VITE_REURl
            const response = await axios.post(url,regData)
            alert('user Successfully registered')
            setRegData({
                email:'',
                password:'',
            })
            navigate('/login')
            return response.data
        } catch (error) {
            console.log('This is your error', error)
        }
    }

    return (
        <div>
            <div className='min-h-screen flex flex-col justify-center py-12 px-3 md:px-6 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-owncolor'>Create a New account</h2>
                </div>

                {/* Form Section */}
                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className = 'border-2 border-owncolor py-10 px-4 shadow-sm rounded-lg sm:px-10'>
                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <div className='space-y-4'>
                                <label htmlFor="email" className='block text-base font-medium'>Email Address</label>
                                <input id='email' type="email" name="email" value={regData.email} onChange={handleChange} placeholder='Enter Your email Address' className='text-black appearance-none block w-full px-3 py-1 border-2 border-white rounded-md shadow-sm focus:outline-none focus:ring-owncolor focus:border-owncolor sm:textsm' />
                                {errors.email && <p className='text-red-400 text-sm'>{errors.email}</p>}
                            </div>
                            <div className='space-y-4'>
                                <label htmlFor="password" className='block text-base font-medium'>Password</label>
                                <input id='password' type="password" name="password" value={regData.password} onChange={handleChange} placeholder='----' autoComplete='password' className='text-black appearance-none block w-full px-3 py-1 border-2 border-white rounded-md shadow-sm focus:outline-none focus:ring-owncolor focus:border-owncolor sm:textsm' />
                                {errors.password && <p className='text-red-400 text-sm'>{errors.password}</p>}
                            </div>
                            <div>
                                <button type='submit' className='w-full common-button'>Register</button>
                            </div>
                        </form>
                        {/* sign Up Button */}
                        <div className='mt-6'>
                            <div className='flex justify-center text-base'>
                                <span className='px-2 '>Or</span>
                            </div>
                            <div className='mt-6'>
                                <button type='button' className='w-full common-button'><Link to='/login'>Already Have an Account? Log in</Link></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register


