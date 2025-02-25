import React from 'react'

function SummaryCard({icon,text,number,color}) {
  return (
    <div className="rounded flex bg-white w-90">
    <div
      className={`text-xl sm:text-2xl md:text-3xl flex justify-center items-center ${color} text-white px-2 sm:px-4`}
    >
      {icon}
    </div>
    <div className="pl-2 sm:pl-4 py-0.5 sm:py-1">
      <p className="text-sm sm:text-lg font-semibold ">{text}</p>
      <p className="text-lg sm:text-xl font-bold">{number}</p>
    </div>
  </div>
  
  )
}

export default SummaryCard
