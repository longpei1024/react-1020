/* 
redux最核心的管理对象store
 */

 import { createStore } from 'redux'

 import reducer from './reducer'

 //向外面默认暴露一个store对象
export default createStore(reducer)
