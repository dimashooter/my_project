import { ReactNode, createContext, useContext, useMemo, useState } from "react";


const ForceContext = createContext({
  value: true,
  forceUpdate: () => { }
})

export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceContext)

  return forceUpdate
}


export const ForceUpdateProfived = ({ children }: { children: ReactNode }) => {

  const [value, setValue] = useState(true)


  const forceUpdateValue = () => {

    setValue(prev => !prev)
    setTimeout(() => {
      setValue(prev => !prev)
    }, 0)
  }

  const valueContext = useMemo(() => {
    return {
      value, forceUpdate: forceUpdateValue
    }
  }, [value])


  if (value === false) {
    return null
  }



  return (

    <ForceContext.Provider value={valueContext} >
      {children}
    </ForceContext.Provider>
  )
}
