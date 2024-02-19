import React from 'react'
import Highlighttext from './Highlighttext';
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import Compare_with_others from '../../../assets/Images/Compare_with_others.png'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'

const LearningLanguageSection = () => {
    return (
        <div className='mt-[150px]'>
            <div className='flex flex-col gap-5 items-center'>
                <div className='text-center text-4xl font-semibold'>
                    Your Swiss Knife for
                    <Highlighttext text={"Learning any language"} />
                </div>

                <div className=' text-center text-richblack-600 mx-auto font-inter w-[70%]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className=' flex items-center justify-center mt-5'>
                    <img src={knowYourProgress} alt='knowYourProgress' className='translate-x-[30%] object-contain h-fit' />
                    <img src={Compare_with_others} alt='Compare_with_others' className='z-[100] object-contain' />
                    <img src={Plan_your_lessons} alt='Plan_your_lessons' className='translate-x-[-30%] z-[100] object-contain' />
                </div>


                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn more
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection;