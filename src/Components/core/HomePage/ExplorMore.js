import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import Highlighttext from './Highlighttext';
import CourseCard from './CourseCard';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExplorMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }


    return (
        <div>
            <div className='text-4xl font-semibold text-center '>
                Unlock the
                <Highlighttext text={"Power of Code"} />
            </div>

            <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
                Learn to build you can imagine
            </p>

            <div className='flex rounded-full bg-richblack-800 mb-5 mt-5 px-[15px] py-[7px] '>
                {
                    tabsName.map((ele, index) => {
                        return (
                            <div className={`text-[16px] flex items-center gap-2
                        ${currentTab === ele ? 'bg-richblack-900 text-richblack-5 font-medium' : 'text-richblack-200'}
                        rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-8 mx-1 py-2
                        `} key={index}
                                onClick={() => setMyCards(ele)}
                            >
                                {ele}
                            </div>
                        )
                    })
                }
            </div>

            <div className='h-[150px]'></div>

            {/* couse group */}
            <div className='flex gap-10 justify-between w-full'>
                {
                    courses.map((ele, index) => {
                        return (
                                <CourseCard
                                    key={index}
                                    cardData={ele}
                                    currentCard={currentCard}
                                    setCurrentCard={setCurrentCard}
                                />
                        )
                    })                                               
                }
            </div>
        </div>
    )
}

export default ExplorMore;