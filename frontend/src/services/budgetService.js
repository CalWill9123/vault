import axios from "axios";

const baseURL = '/api/budget'

const getBudget = (token) => {
    return axios.get(baseURL, {
        headers: {Authorization: `Bearer ${token}`}
    }).then(res => res.data)
}

const addBudget = (budget,token) => {
    return axios.post(baseURL,budget,{
        headers: {Authorization: `Bearer ${token}`}
    }).then(res => res.data)
}


export default {getBudget,addBudget}