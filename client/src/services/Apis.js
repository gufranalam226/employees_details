import { commonRequest } from "./Apicall";
import {BASE_URL} from './helper'

export const registerUser = async(data, header) =>{
    return await commonRequest("POST", `${BASE_URL}/user/register`, data, header);
}

export const usergetfn = async(search, gender, status, sort)=>{
    return await commonRequest('GET', `${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}`, "")
}

export const singleUserGetfn = async(id)=>{
    return await commonRequest("GET", `${BASE_URL}/user/${id}`, '')
}


export const editFunc = async(id, data, header) =>{
    return await commonRequest("PUT", `${BASE_URL}/user/edit/${id}`, data, header)
}

export const deletefn = async(id)=>{
    return await commonRequest("DELETE", `${BASE_URL}/user/delete/${id}`, "")
} 

export const statusChangefn = async(id, data) =>{
    return await commonRequest("PUT", `${BASE_URL}/user/status/${id}`, {data})
}

export const exporttocsvfn = async()=>{
    return await commonRequest("GET", `${BASE_URL}/userexport`,'' )
}