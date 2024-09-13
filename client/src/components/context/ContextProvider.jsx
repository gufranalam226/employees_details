import React, { children, useState , createContext} from 'react'
export const addData = createContext();
export const upddateData = createContext();
 
function ContextProvider({children}) {
  const [useradd, setUseradd] = useState('');
  const [update, setUpdate]  =useState("")
  
    return (
    <>
    <addData.Provider value={{useradd, setUseradd}}>
      <upddateData.Provider value={{update, setUpdate}}>

        {children}
      </upddateData.Provider>

    </addData.Provider>
      
    </>
  )
}

export default ContextProvider
