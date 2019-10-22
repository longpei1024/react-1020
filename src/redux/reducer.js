/* 
reducer函数：根据原有的state和指定的action，并返回一个新的state
 */

 import {
   DECREEMENT,
   INCREEMENT
 } from './action-types'

 /* 
 用于管理count数据的reducer函数
  */

  export default function count(state = 1, action) {
    console.log('cout()', state, action)

    switch (action.type) {
      case INCREEMENT:
        return state + action.data
      case DECREEMENT:
        return state - action.data
      default:
        return state 
    }
    
  }