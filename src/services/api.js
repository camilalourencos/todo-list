import axios from "axios";

const api =  axios.create({
    baseURL: "https://loopback-todo-api.herokuapp.com",
 })
 

export default api; 