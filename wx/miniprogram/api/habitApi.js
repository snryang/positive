exports.myHabits = () => {
    return wx.cloud.callFunction({
        name: 'yun',
        data: {
            a: "habit.myHabits",
            b: 30
        }
    })
}

//删除习惯
exports.del = (habitId) => {
    return wx.cloud.callFunction({
        name: 'yun',
        data: {
            a: "habit.del",
            b: habitId
        }
    })
}

exports.currentHabit = () => {
    return wx.cloud.callFunction({
        name: 'yun',
        data: {
            a: "habit.currentHabit",
            b: 30
        }
    })
}

exports.add = (name) => {
    return wx.cloud.callFunction({
        name: 'yun',
        data: {
            a: "habit.add",
            b: name
        }
    })
}

exports.inc = (habitId) => {
    return wx.cloud.callFunction({
        name: 'yun',
        data: {
            a: "habit.inc",
            b: habitId
        }
    })
}