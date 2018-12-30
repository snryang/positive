//习惯 例行工事 

//获取执行中的习惯
async function getRunningHabit(openId, num, cloud){
  let _ = cloud.database().command
  let res = await cloud.database().collection('habits').where({ openId, num: _.lt(num) }).get();
  if (res.data.length > 0) {
    return res.data[0];
  } else {
    return null;
  }
}

//习惯次数加一
exports.inc = async(habitId,cloud) =>{
  return await db.collection('habits').doc(habitId).update({
    data: {
      num: _.inc(1),
      lastTime:new Date()
    }
  })
}


//添加一个习惯
exports.add = async (name, cloud) => {
  let openId = cloud.getWXContext().OPENID
  let habit = await getRunningHabit(openId,30,cloud)
  if(habit == null){
    let res = await cloud.database().collection("habits").add({
      name,
      num: 0,      
      openId: openId,
      createTime: new Date(),
      lastTime: new Date(),
    });
    console.log(res);
    return res;
  }else{
    return habit;
  }
}

exports.getCurrentHabit = async (num,cloud) => {
  let openId = cloud.getWXContext().OPENID
  let _ = cloud.database().command
  return await getRunningHabit(openId, num, cloud)
}

//删除习惯
exports.del = async (habitId, cloud) => {
  return await cloud.database().collection("habits").doc(habitId).remove();
}