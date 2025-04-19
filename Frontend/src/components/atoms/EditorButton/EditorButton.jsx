import React from 'react'

const EditorButton = ({isactive}) => {
  return (
    <> 
        <button className={`px-[10px] py-[2px] align-middle
                ${isactive?'text-white bg-[#303242] border-t-[4px] border-solid border-t-[#f7b9dd]'
                :'text-[#959eba] bg-[#4a4859]'}
                outline-none h-[35px] min-w-[100px] `}>
            file.js
        </button>
    </>
    
  )
}

export default EditorButton