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