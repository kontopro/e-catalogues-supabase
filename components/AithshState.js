import { createContext, useState, useContext } from 'react';

const AithshStateContext = createContext();
const AithshStateProvider = AithshStateContext.Provider;

export const AithshProvider = ({ children }) => {
  
  const [aithsh, setAithsh] = useState([])

  function handleAithsh(x,y,z){
    y=='0'?
      removeAithsh(x):
        aithsh.findIndex(({ao})=>ao===x)<0?
          addAithsh(x,y,z):
            updateAithsh(x,y,z)
  }

  function updateAithsh(x,y,z){
    const oldait = aithsh.filter(({ao})=>ao !== x)
    setAithsh([...oldait,{ao:x,pos:y, per:z}])
  }

  function addAithsh(x,y,z){ 
    setAithsh([...aithsh, {ao:x,pos:y, per:z}])
  }

  function removeAithsh(x){
    const oldait = aithsh.filter(({ao})=> ao !== x)
    setAithsh([...oldait])
  }

  return (
    <AithshStateProvider value={{aithsh, handleAithsh}}>
      {children}
    </AithshStateProvider>
  )
  
}

export const useAithsh = () => useContext(AithshStateContext)