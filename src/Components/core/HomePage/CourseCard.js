import React, { useState } from 'react'

const CourseCard = ({ cardData, key, currentCard, setCurrentCard }) => {
    const [bgColor,setBgColor]=useState(false);
    return (
        <div className='flex gap-5 '>
            <div className={`flex flex-col mx-3 py-4 mb-9 gap-7 px-16 ${currentCard===cardData.heading? 'bg-white text-richblack-800':'bg-richblack-800'}`} onClick={()=>setCurrentCard(cardData.heading)}>
                <div>
                    {cardData.heading}
                </div>
                <div>
                    {cardData.description}
                </div>
                <div className='flex justify-between'>
                    <div> 

                    {cardData.level}
                    </div>
                    <div>

                    {cardData.lessionNumber}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;