import axios from "axios"


export  default {
    user:{
        async reg(user){            
            let res = await axios.post('/api/user/reg',user)
            return res.data
        },
        async login(phone,password){
            let res = await axios.post('/api/user/login',{phone,password,gender:'',nickname:''})
            return res.data
        },
        async getDetail(id32){

        },
        async saveDetail(userDetail){

        }
    }
}