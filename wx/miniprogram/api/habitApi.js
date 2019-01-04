let {yun} = require("./yun.js");

exports.myHabits = () => {
    return yun("habit.myHabits",30);
}

exports.del = (habitId) => {
    return yun("habit.del",habitId);
}

exports.currentHabit = () => {
    return yun("habit.currentHabit",30);
}

exports.add = (name) => {
    return yun("habit.add",name);
}

exports.inc = (habitId) => {
    return yun("habit.inc",habitId);
}

exports.selectHabits = (filter) =>{
    return yun("habit.selectHabits",filter);
}