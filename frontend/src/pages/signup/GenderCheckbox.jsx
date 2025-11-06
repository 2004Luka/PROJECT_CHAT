import React from 'react'

const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='space-y-3'>
      <label className='block mb-2'>
        <span className='text-sm font-semibold text-[#CCCCCC] font-mono'>Gender</span>
      </label>
      <div className='flex flex-col sm:flex-row gap-3'> 
        {/* Checkbox Option - High-contrast dark mode */}
        <label className={`flex items-center justify-between sm:justify-center w-full sm:flex-1 gap-3 cursor-pointer p-4 border transition-all duration-200 ${
          selectedGender === "male" 
            ? "bg-[#1E1E1E] border-[#00FF99]" 
            : "bg-[#111111] border-[#333333] hover:border-[#00FF99]"
        }`}>
          <span className={`text-sm font-medium font-mono ${selectedGender === "male" ? "text-[#00FF99]" : "text-[#CCCCCC]"}`}>Male</span>
          <div className='relative'>
            <input 
              type="checkbox" 
              className='sr-only' 
              checked={selectedGender==="male"}
              onChange={()=>onCheckboxChange("male")}
            />
            <div className={`w-5 h-5 border-2 transition-all duration-200 ${
              selectedGender === "male" 
                ? "bg-[#00FF99] border-[#00FF99]" 
                : "bg-[#1E1E1E] border-[#333333]"
            }`}>
              {selectedGender === "male" && (
                <svg className="w-full h-full text-[#1E1E1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </label>
        {/* Checkbox Option - High-contrast dark mode */}
        <label className={`flex items-center justify-between sm:justify-center w-full sm:flex-1 gap-3 cursor-pointer p-4 border transition-all duration-200 ${
          selectedGender === "female" 
            ? "bg-[#1E1E1E] border-[#00FF99]" 
            : "bg-[#111111] border-[#333333] hover:border-[#00FF99]"
        }`}>
          <span className={`text-sm font-medium font-mono ${selectedGender === "female" ? "text-[#00FF99]" : "text-[#CCCCCC]"}`}>Female</span>
          <div className='relative'>
            <input 
              type="checkbox" 
              className='sr-only' 
              checked={selectedGender==="female"}
              onChange={()=>onCheckboxChange("female")}
            />
            <div className={`w-5 h-5 border-2 transition-all duration-200 ${
              selectedGender === "female" 
                ? "bg-[#00FF99] border-[#00FF99]" 
                : "bg-[#1E1E1E] border-[#333333]"
            }`}>
              {selectedGender === "female" && (
                <svg className="w-full h-full text-[#1E1E1E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}
 
export default GenderCheckbox
