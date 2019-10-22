/* 
封装一个能发ajax请求的函数/对象
进行axios的二次封装(ajax请求)

  1). 将post请求的data对象数据转换为urlencode格式的字符串数据
  2). 如果请求成功, 判断操作是否成功
      如果成功返回返回的data数据, 外部具体请求得到需要的数据
      如果失败返回携带msg的错误, 外部具体请求处理错误
  3).统一处理请求异常, 外部调用者不用再处理请求异常
  4). 请求过程中显示请求进度的效果
*/

import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const instance = axios.create({
  timeout: 10000
})

instance.interceptors.request.use(config => {
  console.log('request interceptor onResolved()')

  const {data} = config
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }

  return config

})

instance.interceptors.response.use(
  response => {
    console.log('response interceptor onResolved()')

    NProgress.start()

    const result = response.data
 /*    if (result.status===0) { // 操作成功
      return result.data || {}  // 外部成功回调得到对象类型数据
    } else { // 操作失败
      return Promise.reject(result.msg || '操作失败, 未知原因')
    }  */

    return result

  },
  error => {
    console.log('response interceptor onResolved()')

    NProgress.done()

    message.error('请求出错：'+error.message)

    //中断promise链
    return new Promise(() =>{})
  }
)

//向外暴露instan

export default instance