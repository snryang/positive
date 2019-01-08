let {yun} = require("./yun.js");


exports.myHabits = () => {
    return yun("habit.myHabits",30);
}

exports.del = yun("habit.del")

exports.currentHabit = () => {
    return yun("habit.currentHabit",30);
}

exports.add = yun("habit.add")
exports.inc = yun("habit.inc")
exports.selectHabits = yun("habit.selectHabits")
exports.latestHabitByOpenId = yun("habit.latestHabitByOpenId")