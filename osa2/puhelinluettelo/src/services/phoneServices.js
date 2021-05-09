/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAllContacts = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const addNewContact = contactObj =>{
    const request = axios.post(baseUrl, contactObj)
    return request.then(response => response.data)
}

const removeContact = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const updateContact = (id, newData) =>{
    const request = axios.put(`${baseUrl}/${id}`, newData)
    return request.then(response => response.data)
}
export default {getAllContacts, addNewContact, removeContact, updateContact}