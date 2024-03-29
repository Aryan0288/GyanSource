import React from "react";
import CTAButton from "./Button"
// import Highlighttext from "./Highlighttext";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";


export default function CodeBlocks ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblocks, backgroundGradient, codeColor
}) {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10 `}>

            {/* section 1 */}
            <div className="w-[50%] flex flex-col gap-8">
                {heading}
                <div className="text-richblack-300 font-bold">
                    {subheading}
                </div>

                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >

                        {ctabtn2.btnText} 

                    </CTAButton>
                </div>

            </div>

            {/* section 2 */}

            {/* section-2 */}
            <div className="h-fit flex text-[16px] w-[100%] lg:w-[500px]">
                    <div className='text-center flex flex-col w-[10%] font-inter text-richblack-400 font-bold'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                        <p>12</p>
                    </div>
                    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 `}>
                        <TypeAnimation 
                            sequence={[codeblocks,1000,""]}
                            repeat={Infinity}
                            cursor={true}
                            style={
                                {
                                    whiteSpace:"pre-line",
                                    display:"block",
                                }
                            }
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>

        </div>
    )
}