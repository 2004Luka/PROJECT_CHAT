import React from 'react'

const MessageSkeleton = () => {
  return (
    <div className="flex w-[100%] flex-col gap-4 animate-pulse">
        <div className="h-32 w-full bg-[#2A2A2A] border border-[#333333]"></div>
        <div className="h-4 w-28 bg-[#2A2A2A] border border-[#333333]"></div>
        <div className="h-4 w-full bg-[#2A2A2A] border border-[#333333]"></div>
        <div className="h-4 w-3/4 bg-[#2A2A2A] border border-[#333333]"></div>
    </div>
  )
}

export default MessageSkeleton
