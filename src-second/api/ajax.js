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