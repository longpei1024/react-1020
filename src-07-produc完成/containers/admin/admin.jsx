/* 
后台管理的一级路由组件
*/

import { Layout } from 'antd';
import React,{Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import WithCheckLogin from '../with-check-login'
import LeftNav from './left-nav'
import AdminHeader from './header'

import Home from '../../components/home'
import Category from '../category'
import ProductList from '../product'
import ProductDetail from '../product/detail'
import ProductAddUpdate from '../product/add-update'
import Role from '../role'
import User from '../user'
import Line from '../../components/charts/line'
import Bar from '../../components/charts/bar'
import Pie from '../../components/charts/pie'



const { Footer, Sider, Content } = Layout;


@WithCheckLogin
class Admin extends Component {

  render() {
    
    return (
        <Layout style={{height: '100%'}}>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
            <AdminHeader/>
            <Content style={{backgroundColor:'white', margin:'30px 15px 0 15px'}}>
              <Switch>
                <Route path='/home' component={Home} exact/>
                <Route path='/category' component={Category} exact/>
                <Route path='/product' component={ProductList} exact/>
                <Route path="/product/detail/:id" component={ProductDetail} />
                <Route path="/product/addupdate" component={ProductAddUpdate} />
                <Route path='/role' component={Role} exact/>
                <Route path='/user' component={User} exact/>
                <Route path='/charts/line' component={Line} exact/>
                <Route path='/charts/bar' component={Bar} exact/>
                <Route path='/charts/pie' component={Pie} exact/>
                <Redirect to="/home"/>
              </Switch>
            </Content>
            <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
          </Layout>
        </Layout>

    )
  }
}

export default Admin
