import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateField } from '../utils/Validation'


const Login = () => {
    const navigate = useNavigate()

    const [logData, setLogData] = useState({
        email:'',
        password:''
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLogData({...logData, [name]: value})

        // Validate the feild 
        const errorMessage = validateField(name, value);
        setErrors({...errors, [name]: errorMessage})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate all feilds on submit
        const newErrors = {};
        Object.keys(logData).forEach((key) => {
            const errorMessage = validateField(key, logData[key]);
            if (errorMessage) {
                newErrors[key] = errorMessage;
            }
        })

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            alert('please fill the feild')
            return
        }
        try{
            const url = import.meta.env.VITE_LOGURL
            const response = await axios.post(url,logData,)
            const token = response.data.token;

            if(token){
                localStorage.setItem('token',token)
                alert('login successfull')
                navigate('/')
                logData({
                    email:'',
                    password:'',
                })
            } else {
                alert('no token received')
            }

        } catch(error){
            console.log('This is your error check it', error)
        }
    }

    return (
        <div>
            <div className='min-h-screen flex flex-col justify-center py-12 px-3 md:px-6 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-owncolor'>Log in to your account</h2>
                </div>

                {/* Form Section */}
                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className = 'border-2 border-owncolor py-10 px-4 shadow-sm rounded-lg sm:px-10'>
                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <div className='space-y-4'>
                                <label htmlFor="email" className='block text-base font-medium'>Email Address</label>
                                <input id='email' type="email" name="email" onChange={handleChange} placeholder='Enter Your email address' className='text-black appearance-none block w-full px-3 py-1 border-2 border-white rounded-md shadow-sm focus:outline-none focus:ring-owncolor focus:border-owncolor sm:textsm' />
                                {errors.email && <p className='text-red-400 text-sm'>{errors.email}</p>}
                            </div>
                            <div className='space-y-4'>
                                <label htmlFor="password" className='block text-base font-medium'>Password</label>
                                <input id='password' type="password" name="password" onChange={handleChange} placeholder='----' className='text-black appearance-none block w-full px-3 py-1 border-2 border-white rounded-md shadow-sm focus:outline-none focus:ring-owncolor focus:border-owncolor sm:textsm' />
                                {errors.password && <p className='text-red-400 text-sm'>{errors.password}</p>}
                            </div>
                            <div>
                                <button type='submit' className='w-full common-button'>Login</button>
                            </div>
                        </form>
                        {/* sign Up Button */}
                        <div className='mt-6'>
                            <div className='flex justify-center text-base'>
                                <span className='px-2 '>Or</span>
                            </div>
                            <div className='mt-6'>
                                <button type='button' className='w-full common-button'><Link to='/register'>Create a Account</Link></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login


