/* 
n个用于创建action对象的工厂函数
 */

import {
  DECREEMENT,
  INCREEMENT
} from './action-types'

export const increment = (number) => ({type: INCREEMENT, data: number})

export const decrement = (number) => ({type: DECREEMENT, data: number})
