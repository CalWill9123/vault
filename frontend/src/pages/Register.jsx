import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../services/authService"
const Register = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()


const handleSubmit = (e) => {
  e.preventDefault()

  authService.register({name,email,password})
  .then(() => {
    navigate('/login')
  })
  .catch(err => {
    console.error(`Error ${err} has occured.`)
  })
}


return (
  <div>
    <form onSubmit={handleSubmit}>
    <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder='Enter name'
    />

    <input
    value={email}
    onChange = {(e) => setEmail(e.target.value)}
    placeholder='Enter email'
    />

    <input
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder='Enter password'
    />

    <button type="submit">Submit</button>


  </form>
  </div>
  )
}
export default Register

