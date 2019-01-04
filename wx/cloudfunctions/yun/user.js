exports.update = async(currentUser, cloud) => {
    let openId = cloud.getWXContext().OPENID
    let db = cloud.database()

    try {
        return await db.collection('users').where({
            openId
        }).update({
            data: {
                userInfo: currentUser
            },
        });
    } catch (e) {
        return await db.collection("users").add({
            data: {
                openId,
                userInfo: currentUser
            }
        })
    }
}

exports.selectUsers = async(openIds,cloud) =>{
    return await cloud.database().collection('users').where({
        openId: cloud.database().command.in(openIds)
      }).get()
}