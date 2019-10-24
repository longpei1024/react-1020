import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import { 
  Form, 
  Icon, 
  Input, 
  Button, 
} from 'antd';
// import qs from 'qs'
import { connect } from 'react-redux'

import { loginAsync } from "../../redux/action-creators/user";
import logo from './images/logo.png'
import './login.less'
//import ajax from '../../api/ajax'


 
// @connect(
//   state => ({hasLogin: state.user.hasLogin}),  // 用于显示的一般属性
//   {loginAsync} // 用于更新状态的函数属性
// )
// @Form.create()    // Login = Form.create()(Login)


@connect(
  state => ({hasLogin: state.user.hasLogin}),  // 用于显示的一般属性
  {loginAsync} // 用于更新状态的函数属性
)
@Form.create()    // Login = Form.create()(Login)



 class Login extends Component{

  login = (e) =>{

    e.preventDefault()

    this.props.form.validateFields((err, values)=>{
      if (!err) { // 验证成功
        const {username, password} = values
        console.log('发送ajax请求', {username, password})

        this.props.loginAsync(username, password)

        // axios.post('/login',values)
/*         ajax.post('/login2',values)
          .then(({user, token}) => {
            console.log('登录成功')
          })
          .catch(error => {
            console.log( error )

          }) */

/*         ajax.post('/login', values) // username=admin&password=admin
          .then((result) => {

            const {status, data: {user, token}={}, msg, xxx='abc'} = result // 嵌套解构 变量默认值
            console.log('xxx', xxx)
            if (status===0) {
              console.log('登陆成功', user, token )
            } else {
              console.log('登陆失败', msg)
            }
            
          }) 

 */
      } else{
        // 什么都不用写
      }
    })
  }

  validatorPwd = (rule, value, callback) =>{
    if (value==='') {
      callback('密码不能为空')
    } else if (value.length<4) {
      callback('密码必须大于等于4位')
    } else if (value.length>12) {
      callback('密码必须小于等于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback()
    }

  }
  render(){
    console.log('Login render() ', this.props.form )
    const {hasLogin} = this.props
    if (hasLogin) { // 如果已经登陆, 自动跳转到admin界面
      // this.props.history.replace('/') // 事件回调中使用
      return <Redirect to="/"/> // 在render()中使用
    }


    const { getFieldDecorator } = this.props.form;

    return(
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>

        <section className='login-content'>
          <h3>用户登录</h3>
          <Form onSubmit={this.login} className="login-form">
            <Form.Item>
            {
              getFieldDecorator('username', {
                initialValue: '',
                rules: [
                  { required: true, whitespace: true, message: '用户名不能为空!'},
                  {min: 4, message: '用户名不能小于4位'},
                  {max: 12, message: '用户名不能大于12位' },
                  {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
                )
           }
            </Form.Item>
            <Form.Item>
            {
              getFieldDecorator('password', {
                initialValue: '',
                rules: [
                  {validator:this.validatorPwd}
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="密码"
                />
                )
           }

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}


//  export default connect(
//   state => ({hasLogin:state.user.hasLogin}),
//   {loginAsync}
// )(Form.create()(Login)) 

export default Login
