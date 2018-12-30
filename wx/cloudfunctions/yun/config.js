
exports.get = async (key, cloud) => {  
  let res = await cloud.database().collection('config').where({key:key}).get();
  if(res.data.length> 0){
    return res.data[0].value;
  }else{
    return "";
  }
}