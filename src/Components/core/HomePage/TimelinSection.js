import React from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timeLineImage from '../../../assets/Images/TimelineImage.png'

const timeLine = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully Committed to the success",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description: "Fully Committed to the success",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description: "Fully Committed to the success",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description: "Fully Committed to the success",
    },
]
const TimelinSection = () => {
    return (
        <div>
            <div className='flex gap-10 items-center'>
                <div className='w-[54%] flex flex-col gap-5'>
                    {
                        timeLine.map((ele, index) => {
                            return (
                                <div className='flex gap-6' key={index}>
                                    <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                        <img src={ele.Logo}/>
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>
                                            {ele.heading}
                                        </h2>
                                        <p className='text-base'>{ele.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                    
                <div className='relative shadow-blue-200'>
                    <img src={timeLineImage}
                    alt='timeLineImage'
                    className='shadow-white object-cover h-fit'
                    />

                    <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-8 left-[40%] translate-x-[-35%] translate-y-[-45%]'>
                        <div className='flex gap-5 items-center border-r border-caribbeangreen-200 px-10'>
                            <p className='text-3xl font-bold '>10</p>
                            <p className=' text-caribbeangreen-300 text-sm'>Years of Experience</p>
                        </div>

                        <div className='flex px-10 gap-5 items-center'>
                            <p className='text-3xl font-bold '>
                                250
                            </p>
                            <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default TimelinSection;