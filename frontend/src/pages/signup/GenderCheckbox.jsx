import React from 'react'

const GenderCheckbox = ({onCheckboxChange,selectedGender}) => {
  return (
    <div className='flex gap-4 mt-4'> 
        <div className='flex items-center gap-2'>
            <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${selectedGender === "male" ? "bg-white/10 border border-white/10": "bg-white/5 border border-white/10"}`}>
                <span className='text-white/80'>Male</span>
                <input type="checkbox" className='w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-0' 
                    checked={selectedGender==="male"}
                    onChange={()=>onCheckboxChange("male")}
                />
            </label>
        </div>
        <div className='flex items-center gap-2'>
            <label className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${selectedGender === "female" ? "bg-white/10 border border-white/10": "bg-white/5 border border-white/10"}`}>
                <span className='text-white/80'>Female</span>
                <input type="checkbox" className='w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-0' 
                    checked={selectedGender==="female"}
                    onChange={()=>onCheckboxChange("female")}
                />
            </label>
        </div>
    </div>
  )
}
 
 export default GenderCheckbox
