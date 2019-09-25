import axios from "axios"

axios.defaults.withCredentials=true
//
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
            let res = await axios.get('/api/userdetail/'+id32)
            return res.data
        },
        async saveDetail(userDetail,id32){
            let res = await axios.post('/api/userdetail/save/' + id32,userDetail)
            return res.data
        }
    }
}