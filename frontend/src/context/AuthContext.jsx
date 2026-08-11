import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(() => {
    try{
      const savedUser = localStorage.getItem('auth_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch (e){
      console.error(`Failed to parse session. ${e} has occured.`)
      return null
    }
  })

    useEffect(() =>{
     if (user){
      localStorage.setItem('auth_user',JSON.stringify(user))
     } else{
      localStorage.removeItem('auth_user')
     }
    },[user])
    
  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}



export const useAuth = () => useContext(AuthContext)
