import React from 'react'

const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='flex gap-4 mt-4'> 
        <div className='flex items-center gap-2'>
            <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-all duration-300 ${selectedGender === "male" ? "bg-green-500/20 border border-green-500/50": "hover:bg-green-500/10"}`}>
                <span className='text-green-300'>Male</span>
                <input type="checkbox" className='w-4 h-4 text-green-500 bg-green-500/10 border-green-500/30 rounded focus:ring-green-500 focus:ring-2' 
                    checked={selectedGender==="male"}
                    onChange={()=>onCheckboxChange("male")}
                />
            </label>
        </div>
        <div className='flex items-center gap-2'>
            <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-all duration-300 ${selectedGender === "female" ? "bg-green-500/20 border border-green-500/50": "hover:bg-green-500/10"}`}>
                <span className='text-green-300'>Female</span>
                <input type="checkbox" className='w-4 h-4 text-green-500 bg-green-500/10 border-green-500/30 rounded focus:ring-green-500 focus:ring-2' 
                    checked={selectedGender==="female"}
                    onChange={()=>onCheckboxChange("female")}
                />
            </label>
        </div>
    </div>
  )
}
 
 export default GenderCheckbox
