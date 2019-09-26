import * as R from 'ramda'

let histories = {}
function restore(vue, cb) {
    const hash = location.href
    const history = histories[hash] || null
    if (history != null) {
        R.forEachObjIndexed((value, key) => {
            vue[key] = value
        }, history)
    } else {
        if (cb) cb()
    }
}
function getRestore(vue, cb) {
    const hash = location.href
    const history = histories[hash] || null
    if (history != null) {
        return history
    } else {
        if (cb) cb()
        return null
    }
}

function keep(vue) {
    const hash = location.href
    histories[hash] = R.clone(vue.$data)
}
function clean() {
    const hash = location.href
    delete histories[hash]
}
function cleanAll() {
    histories = {}
}


const event = {}
function reg(key, cb) {
    if(event.hasOwnProperty(key)){
        event[key].push(cb)
    }else{
        event[key] = [cb]
    }
}
function call(key,obj) {
    if(event.hasOwnProperty(key)){
        for(const index in event[key]){
            event[key][index](obj)
        }
    }
}

//记录最近20次路由信息
const _routeHistory=[];
function routeHistoryPush(from,to){
    _routeHistory.push({from,to})
    if(_routeHistory.length > 20){
        _routeHistory.shift()
    }
}
function routeHistory(){
    return _routeHistory
}

const cache={}
function cacheSet(key,value){
    localStorage.setItem(key,JSON.stringify(value))
}
function cacheGet(key){
    let value = localStorage.getItem(key)
    if(value == null) return null;
    return JSON.parse(value)
}

export { restore, getRestore, keep, clean, cleanAll, reg, call,routeHistoryPush,routeHistory,cacheSet,cacheGet }
