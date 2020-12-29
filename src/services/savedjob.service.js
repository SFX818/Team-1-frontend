import axios from 'axios';

//import { setItem, getItem, removeItem } from '../utilities/localStorage.utilities'

import authHeader from '../utilities/authHeader.utilities'

//IMPORTANT NOTE: FOR ALL THE ROUTES THAT USE AUTHJWTS.VERIFYWEBTOKEN YOU HAVE TO PASS IN HEADERS THAT IS RUNNING THE AUTHHEADER FUNCTION WHICH RETURNS THE ACCESS TOKEN
//HEADERS MUST BE PASSED IN WITH AN S, PLURAL, BECAUSE THE BACK END IS EXPECTING REQ.HEADERS
export const getJobs = () => {
    return axios
    .get("http://localhost:8080/profile/savedJobs", {headers: authHeader()})
    // .then((jobsResponse) => {
    //     console.log('jobsResponse', jobsResponse);
    //     return(jobsResponse)
    // })
    // .catch(err => {
    //     console.log('error on getJobs function in service', err)
    // })
}

