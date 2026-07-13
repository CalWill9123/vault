import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from '../services/authService'
import {useAuth} from '../context/AuthContext'


const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const {login} = useAuth()

 
  
  const handleSubmit = (e) => {
    e.preventDefault()
     
    authService.login({email,password})
    .then(res => {login(res)
     navigate('/dashboard')
    
    })
    .catch(err => {
      console.error(`${err} has occured.`)
    })
  }
return( <div>
  <form onSubmit={handleSubmit}>
  <input
  value={email}
  onChange={(e) => setEmail(e.target.value)} 
  placeholder='Enter Login'
  />

  <input
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder='Enter password'
  />

  <button type="submit">Submit</button>
  </form>
  </div>

  
)}
  
export default Login
