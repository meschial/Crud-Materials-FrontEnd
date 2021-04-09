import axios from 'axios'

const apiPublic = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout:  10000
})

export {apiPublic}