import React,{Component} from 'react'
import { 
  Form, 
  Icon, 
  Input, 
  Button, 
} from 'antd';
// import qs from 'qs'

import logo from './images/logo.png'
import './login.less'
import ajax from '../../api/ajax'




 class Login extends Component{

  login = (e) =>{

    e.preventDefault()

    this.props.form.validateFields((err, values)=>{
      if (!err) {
        console.log('发送ajax请求', values)
        // axios.post('/login',values)
/*         ajax.post('/login2',values)
          .then(({user, token}) => {
            console.log('登录成功')
          })
          .catch(error => {
            console.log( error )

          }) */

        ajax.post('/login', values) // username=admin&password=admin
          .then((result) => {

            const {status, data: {user, token}={}, msg, xxx='abc'} = result // 嵌套解构 变量默认值
            console.log('xxx', xxx)
            if (status===0) {
              console.log('登陆成功', user, token )
            } else {
              console.log('登陆失败', msg)
            }
            
          }) 


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


const LoginWrap = Form.create()(Login)

export default LoginWrap