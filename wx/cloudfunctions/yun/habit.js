//习惯 例行工事 

//获取执行中的习惯
async function getRunningHabit(openId, num, cloud) {
    let _ = cloud.database().command
    let res = await cloud.database().collection('habits').where({
        openId,
        num: _.lt(num)
    }).get();
    if (res.data.length > 0) {
        return res.data[0];
    } else {
        return null;
    }
}

//习惯次数加一
exports.inc = async(habitId, cloud) => {
    return await db.collection('habits').doc(habitId).update({
        data: {
            num: _.inc(1),
            lastTime: new Date()
        }
    })
}


//添加一个习惯
exports.add = async(name, cloud) => {

    let openId = cloud.getWXContext().OPENID
    let habit = await getRunningHabit(openId, 30, cloud)
    if (habit == null) {
        console.log("habits:add");
        let habit = {
            name,
            num: 0,
            openId: openId,
            createTime: new Date(),
            lastTime: new Date(),
        }
        let res = await cloud.database().collection("habits").add({
            data: habit
        });
        habit._id = res._id;
        console.log(res);

        //将习惯更新到用户表，去数据库不支持group by ，查询不方便。
        try {
            return await cloud.database().collection('users').where({
                openId
            }).update({
                data: {
                    habit: name
                },
            });
        } catch (e) {
            return await cloud.database().collection("users").add({
                data: {
                    openId,
                    habit:name
                }
            })
        }

        return habit;
    } else {
        return habit;
    }
}

exports.latestHabitByOpenId = async (openId,cloud) =>{
    let res = await cloud.database().collection('habits').where({openId}).orderBy('createTime', 'desc').limit(1).get();
    if(res.data.length > 0) return res.data[0].name;
    return "";
}



//当前正在进行的习惯
exports.currentHabit = async(num, cloud) => {
    let openId = cloud.getWXContext().OPENID
    let _ = cloud.database().command
    return await getRunningHabit(openId, num, cloud)
}

//删除习惯
exports.del = async(habitId, cloud) => {

    let openId = cloud.getWXContext().OPENID;
    cloud.database().collection('habits').doc(habitId).get().then(res => {
      if(res.data.openId == openId){
        cloud.database().collection("habits").doc(habitId).remove();
      }    
    })
    return true; 

    //return await cloud.database().collection("habits").doc(habitId).remove();
}

//获取我的习惯
exports.myHabits = async(num, cloud) => {
    let openId = cloud.getWXContext().OPENID
    let _ = cloud.database().command
    let res = await cloud.database().collection('habits').where({
        openId,
        num: _.lt(num)
    }).orderBy('createTime', 'desc').get();

    return res.data;
}


exports.selectHabits = async (filter, cloud) => {
    //filter:{openId:'',pageIndex:1,pageSize}
    filter.pageIndex = filter.pageIndex || 1;
    filter.pageSize = filter.pageSize || 30;
    var list = cloud.database().collection('habits');
    if (filter.hasOwnProperty('openId')) {
      list = list.where({ openId: filter.openId });
    }
    if (filter.pageIndex > 1) {
      list = list.skip((filter.pageIndex - 1) * filter.pageSize);
    }
    return await list.limit(filter.pageSize).orderBy('lastTime', 'desc').get();
  }