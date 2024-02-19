import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import Highlighttext from './Highlighttext'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex gap-20 items-center'>
            <div className='w-[50%]'>
                <img src={Instructor}
                alt='Instructor'
                className='shadow-white '
                />
            </div>

            <div className='w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold'>
                    Became an 
                    <Highlighttext text={"Instructor"}/>
                </div>

                <p className='font-medium tetx-[16px] w-[80%] text-richblack-300'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.

                </p>
                <div className='w-fit'>
                <Button active={true} linkto={"/signup"}>
                    <div className='flex gap-2 items-center '>
                        Start learning today
                        <FaArrowRight/>
                    </div>
                </Button>
                    
                </div>
            </div>  
        </div>
    </div>
  )
}

export default InstructorSection