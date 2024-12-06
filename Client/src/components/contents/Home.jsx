import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validateField } from '../utils/Validation';

const Home = () => {
  const navigate = useNavigate()
  const [checkIn,setCheckIn] = useState({
    name:'',
    age:'',
    mood:'',
    stress:'',
    activity:'',
    thoughts:''
  })
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [errors, setErrors] = useState({})

  
  const storedToken = localStorage.getItem('token');
    
 
  const handleChange = (e) => {
    const { name, value} = e.target;
    setCheckIn({...checkIn, [name]: value})

    //Validate the feild Dynamically
    const errorMessage = validateField(name, value);
    setErrors({...errors, [name]: errorMessage})
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate all feilds
    const newErrors = {};
    Object.keys(checkIn).forEach((key) => {
      const errorMessage = validateField(key, checkIn[key])
      if(errorMessage){
        newErrors[key] = errorMessage
      }
    })

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      alert('please fill the errors')
    }

    // Check user loged or not
    if(!storedToken || storedToken === null){
      alert('please sign up')
      navigate('/login')
    } else{
      setToken(storedToken)
    }
    

    try {
      const url = import.meta.env.VITE_CHECKURL
      const response = await axios.post(url, checkIn,{
        headers:{
          'Content-Type':'application/json',
          token: token,
        }
      })
      alert('Successfully submited')
      setCheckIn({
        name:'',
        age:'',
        mood:'',
        stress:'',
        activity:'',
        thoughts:''
      })
      localStorage.removeItem('token')
      return response.data;
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
        <div className='py-12 px-4 sm:px-6 lg:px-8'>
          <div className='grid gird-cols-1 md:grid-cols-3 gap-8'>
            <div className='md:col-span-2'>
              <h1 className='text-3xl font-bold mb-6'>Mental Health Check-In</h1>
              <form className='border-2 border-owncolor rounded px-8 pt-6 pb-8 mb-4 space-y-4' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="Name" className='block text-base font-bold mb-4'>Name</label>
                  <input id='Name' type="text" name='name' onChange={handleChange} value={checkIn.name} className='text-black leading-tight appearance-none block w-full px-3 py-1 border-2 border-white rounded-md shadow-sm focus:outline-none focus:ring-owncolor focus:border-owncolor sm:textsm'/>
                  {errors.name && <p className='text-red-400 text-sm'>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="Age" className='block text-base font-bold mb-4'>Age</label>
                  <input id='Age' type="number" name='age' onChange={handleChange} value={checkIn.age} className='text-black leading-tight appearance-none block w-full px-3 py-1 border-2 border-white rounded-md shadow-sm focus:outline-none focus:ring-owncolor focus:border-owncolor sm:textsm'/>
                  {errors.age && <p className='text-red-400 text-sm'>{errors.age}</p>}
                </div>
                <div>
                  <label htmlFor="Mood" className='block text-base font-bold mb-4'>Mood (1-10)</label>
                  <input id='Mood' type="range" name="mood" min='1' max='10' onChange={handleChange} value={checkIn.mood} className='w-full ' />
                  <div className='flex justify-between text-xs'>
                    <span>1 (Low)</span>
                    <span>5 (Neutral)</span>
                    <span>10 (High)</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="stress" className='block text-base font-bold mb-4'>Stress Level (1-10)</label>
                  <input id='stress' type="range" name="stress" min='1' max='10' onChange={handleChange} value={checkIn.stress} className='w-full ' />
                  <div className='flex justify-between text-xs'>
                    <span>1 (Low)</span>
                    <span>5 (Neutral)</span>
                    <span>10 (High)</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="Activity" className='block text-base font-bold mb-4'>Recent Activity</label>
                  <input id='Activity' type="text"  name='activity' onChange={handleChange} value={checkIn.activity} className='text-black leading-tight appearance-none block w-full px-3 py-1 border-2 border-white rounded-md shadow-sm focus:outline-none focus:ring-owncolor focus:border-owncolor sm:textsm'/>
                </div>
                <div>
                  <label htmlFor="thought" className='block text-base font-bold mb-4'>Thoughts</label>
                  <textarea id='thought' name="thoughts" onChange={handleChange} value={checkIn.thoughts} className='h-32 text-black leading-tight appearance-none block w-full px-3 py-2 border-2 border-white rounded-md shadow-sm focus:outline-none focus:ring-owncolor focus:border-owncolor sm:textsm'></textarea>
                </div>
                <div>
                  <button type='submit' className='w-full common-button'>Submit</button>
                </div>
              </form>
            </div>
            {/* About */}
            <div className='md:col-span-1'>
              <div className='px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-owncolor text-2xl font-bold mb-4'>About Mental Health Check-Ins</h2>
                <p className='mb-2'>Regular mental health check-ins are an important part of maintaining overall well-being. They can help you:</p>
                <ul className="list-disc list-inside mb-4">
                  <li>Track your mood over time</li>
                  <li>Identify patterns in your mental state</li>
                  <li>Recognize triggers for stress or anxiety</li>
                  <li>Develop self-awareness</li>
                  <li>Provide valuable information for healthcare providers</li>
                </ul>
              <p className=" mb-4">Remember, this check-in is a tool for self-reflection and is not a substitute for professional medical advice. If you're experiencing severe or persistent mental health issues, please consult with a qualified healthcare provider.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home