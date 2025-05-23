import React from "react"

// eslint-disable-next-line react/prop-types
const TransitionWithBorder = ({ colorFrom, colorTo }) => {
    return (
        <div className={colorTo}>
            <div className={`h-18 md:h-32 ${colorFrom} rounded-bl-[4rem] md:rounded-bl-[5rem]`}/>
        </div>
    )
}

export default TransitionWithBorder
