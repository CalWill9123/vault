import axios from 'axios'

const baseURL = '/api/auth'

const register = (userData) => axios.post(`${baseURL}/register`,userData).then(res => res.data)

const login = (userData) => axios.post(`${baseURL}/login`,userData).then(res => res.data)

export default {register, login}

