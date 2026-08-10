import axios from 'axios'

const baseURL = '/api/transactions'


const getTransactions = (token) => {
    return axios.get(baseURL, {
        headers: {Authorization: `Bearer ${token}`}
    }).then(res => res.data)
}

const addTransactions = (transaction,token) => {
    return axios.post(baseURL,transaction, {
        headers: {Authorization: `Bearer ${token}`},
    }).then(res =>res.data)
}


const deleteTransaction = (id,token) => {
    return axios.delete(`${baseURL}/${id}`,{
    headers: {Authorization: `Bearer ${token}`}
    }).then(res => res.data)
}

export default {getTransactions, addTransactions,deleteTransaction}
