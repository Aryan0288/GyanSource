import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'
import Highlighttext from '../Components/core/HomePage/Highlighttext';
import CTAButton from '../Components/core/HomePage/Button'
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../Components/core/HomePage/CodeBlocks';
import { GlowEffect, MyComponent } from '../Components/core/HomePage/SlinkyComponents';
import '../Components/core/HomePage/Css/HomePage.css'
import TimelinSection from '../Components/core/HomePage/TimelinSection';
import LearningLanguageSection from '../Components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../Components/core/HomePage/InstructorSection';
import ExplorMore from '../Components/core/HomePage/ExplorMore';

const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <div className='relative max-w-maxContent mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
                <Link to={"/signup"}>
                    <div className='mt-16 p-1 mx-auto rounded-full text-white font-bold transition-all duration-200 scale-95 w-fit group'>
                        <div className='glow-on-hover px-12 py-3 text-center flex items-center gap-2  rounded-full '>
                            <p>Become a instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower your future with
                    <Highlighttext text={" Coding Skills"} />
                </div>

                <div className='mt-6 w-[68%] text-center text-lg font-bold text-richblack-300 '>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/siignup"}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Book a demo</CTAButton>
                </div>

                <div className='mx-3 my-14 shadow-blue-200 '>
                    <video
                        muted
                        autoPlay
                        loop
                    >
                        <source src={banner} type='video/mp4' />
                    </video>
                </div>



                {/* code section -1 */}


                <div className='relative'>
                    <div className='absolute right-[10rem] top-[6rem] opacity-60 '>
                        <MyComponent />

                    </div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <Highlighttext text={"coding potential"} />
                                with our online course
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "Try it yourself",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false
                            }
                        }

                        codeblocks={
                            `<!DOCTYPE html >\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="style.css" />\n</head>\n<body>\n<h2>This is my Home Page</h2>\n<p>Avail this course and explore Your Potential</p>\n</body>\n</html>`
                        }
                        codeColor={"text-yellow-25"}
                    />
                </div>

                {/* code section -2 */}

                <div className='relative'>
                    <div className='absolute left-[9rem] top-[9rem]'>
                        <GlowEffect />
                    </div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <Highlighttext text={"coding potential"} />
                                with our online course
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "Try it yourself",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false
                            }
                        }

                        codeblocks={
                            `<!DOCTYPE html >\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="style.css" />\n</head>\n<body>\n<h2>This is my Home Page</h2>\n<p>Avail this course and explore Your Potential</p>\n</body>\n</html>`
                        }
                        codeColor={"text-[#00FFFF]"}
                    />
                </div>

                <ExplorMore/>
            
            </div>


            {/* section 2 */}

            <div className="bg-pure-greys-5 text-richblack-700">
                <div className='homepage_bg h-[310px]'>
                    <div className='h-[150px]'></div>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                        <div className='flex gap-7 text-white'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>


                <div className='mt-24 mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className=' flex gap-5 mt-[95px ] mb-10'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the Skiills you need for a
                            <Highlighttext text={"Job that is in demand"} />
                        </div>

                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px] font-medium'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                        {/* Time line section  */}
                    <TimelinSection />

                    {/* learning language section */}

                    <LearningLanguageSection/>
                </div>
            </div>
            {/* <div className='bg-white'> */}
            {/* </div> */}

            {/* section 3 */}

            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
                <InstructorSection/>
                <h2 className='text-center text-4xl font-semibold mt-10'>
                    reviews from Other Learners
                </h2>

                {/* Review slider */}
            </div>

            {/* section 4 */}
        </div>
    )
}

export default Home;