import axios from "axios"


axios.defaults.withCredentials=true
//
export  default {
    config:{
        async get(key){
            let res = await axios.get('/api/v1/config/' + key)
            return res.data || ''
        }
    },
    lifephoto:{
        async upload(file){
            let formData = new FormData();     
            formData.append("uploadfile",file);
            let res = await axios.post("/api/v2/uploadlifephoto", formData, {"Content-Type": "multipart/form-data"})      
            return res.data
        },
        async get(){
            let res = await axios.get('/api/v2/lifephoto')
            return res.data
        },
        async del(filename){
            let res = await axios.get('/api/v2/deletelifephoto',{
                params: {
                    filename
                }
              })
            return res.data
        }
    },
    user:{
        async reg(user){            
            let res = await axios.post('/api/v1/user/reg',user)
            return res.data
        },
        async login(phone,password){
            let res = await axios.post('/api/v1/user/login',{phone,password,gender:'',nickname:''})            
            return res.data
        },
        async getDetail(){
            let res = await axios.get('/api/v2/userdetail')
            return res.data
        },
        async saveDetail(userDetail){
            let res = await axios.post('/api/v2/userdetail/save',userDetail)
            return res.data
        }
    }
}