//习惯 例行工事 

async function getRunningHabit(openId, finish, cloud) {
    let _ = cloud.database().command
    let res = await cloud.database().collection('habits').where({
        openId,
        finish
    }).get();
    return res.data;
}

//习惯次数加一
exports.inc = async(habitId, cloud) => {
    let habit = await cloud.database().collection('habits').doc(habitId).get();
    console.log(habit);
    return await cloud.database().collection('habits').doc(habitId).update({
        data: {
            num: cloud.database().command.inc(1),
            finish: habit.data.num >= 29,
            lastTime: new Date()
        }
    })
}


//添加一个习惯
exports.add = async(obj, cloud) => {
    let openId = cloud.getWXContext().OPENID

    let habit = {
        name: obj.name,
        num: 0,
        finish: false,
        openId: openId,
        createTime: new Date(),
        lastTime: null,
    }
    let res = await cloud.database().collection("habits").add({
        data: habit
    });
    habit._id = res._id;

    //将习惯更新到用户表，去数据库不支持group by ，查询不方便。
    try {
        await cloud.database().collection('users').where({
            openId
        }).update({
            data: {
                habit: obj.name
            },
        });
    } catch (e) {
        await cloud.database().collection("users").add({
            data: {
                openId,
                habit: obj.name
            }
        })
    }

    return habit;

}



//删除习惯
exports.del = async(habitId, cloud) => {

    let openId = cloud.getWXContext().OPENID;
    let res = await cloud.database().collection('habits').doc(habitId).get();
    console.log(res);
    if (res.data.openId == openId) {
        await cloud.database().collection("habits").doc(habitId).remove();
        return true;
    } else {
        return false;
    }
}

//获取我的习惯
exports.myHabits = async (finish, cloud) => {
    let openId = cloud.getWXContext().OPENID
    let _ = cloud.database().command
    let res = await cloud.database().collection('habits').where({
        openId,
        finish
    }).orderBy('createTime', 'desc').get();

    return res.data;
}


exports.selectHabits = async(filter, cloud) => {
    //filter:{openId:'',finish'',pageIndex:1,pageSize}
    filter.pageIndex = filter.pageIndex || 1;
    filter.pageSize = filter.pageSize || 30;
    var list = cloud.database().collection('habits');
    if (filter.hasOwnProperty('openId')) {
        list = list.where({
            openId: filter.openId
        });
    }
    if (filter.hasOwnProperty('finish')) {
        list = list.where({
            finish: filter.finish
        });
    }
    if (filter.pageIndex > 1) {
        list = list.skip((filter.pageIndex - 1) * filter.pageSize);
    }
    return await list.limit(filter.pageSize).orderBy('lastTime', 'desc').get();
}