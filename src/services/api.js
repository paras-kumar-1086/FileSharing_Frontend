import axios from "axios" ; 


const API_URL = 'https://filesharing-ohbx.onrender.com' ;  

const uploadFile = async (data) => {
    try{
       let response = await axios.post(`${API_URL}/upload`, data);
       return response.data ;
    }
    catch (error) {
        console.log("Error while running api upload", error.message);
    }
}

export  {API_URL , uploadFile} ; 