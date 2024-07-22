import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img
                    alt='Tailwind CSS chat bubble component'
                    src='https://avatar.iran.liara.run/public/boy?username=John'
                />
            </div>
        </div>
      <div className='chat-bubble text-white bg-blue-500'>hi fuck you</div>
      <time className="text-xs opacity-50">12:45</time>
    </div>
  )
}

export default Message
