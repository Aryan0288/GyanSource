import React, { useState } from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    const [bgColor, setBgColor] = useState(false);
    return (
        <div  className={`${currentCard === cardData.heading ? 'bg-yellow-100 pr-3 pb-3  text-richblack-800' : 'bg-richblack-800'}`}>
            <div className={`z-[100] py-7 flex flex-col relative text-richblack-400 ${currentCard === cardData.heading ? 'bg-white -mt-3 z-[100] text-richblack-800' : 'bg-richblack-800 '}`} onClick={() => setCurrentCard(cardData.heading)}>
                <div className="px-8  flex flex-col gap-4 mb-10" >
                    <div className={`text-2xl ${currentCard === cardData.heading ? 'font-bold font-inter':'text-white'}`}>
                        {cardData.heading}
                    </div>
                    <div>
                        {cardData.description}
                    </div>
                </div>
                <div className={`flex font-[500] text-[17px] justify-between px-8 pt-5 border-t-2 border-dashed border-richblack-500  ${currentCard === cardData.heading ? ' text-blue-300' : 'bg-richblack-800 '}`}>
                    <div className='flex gap-2 items-center'>
                        <HiUsers></HiUsers>
                        {cardData.level}
                    </div>
                    <div className='flex gap-2 items-center'>
                        <ImTree></ImTree>
                        {cardData.lessionNumber}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;