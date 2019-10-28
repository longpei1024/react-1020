import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'  // 高阶组件, 用来包装非路由组件
import { Modal, Button, Icon } from 'antd';  //弹框提醒插件modal
import dayjs from 'dayjs'
import screenfull from 'screenfull' //全屏插件

import LinkButton from '../../../components/link-button'
import {removeUserToken} from '../../../redux/action-creators/user'
import {reqWeather} from '../../../api'

import './index.less'
/* 
管理界面的头部组件
*/
@connect(
  state => ({
  username:state.user.user.username,
  headerTitle: state.headerTitle
  }),
  {removeUserToken}
)
@withRouter //向组件内部传入3个属性: history/location/match
 class Header extends Component {

  state = {
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayPictureUrl: '',  // 天气图片的url
    weather: '', // 天气文本
    isFullScreen: false, // 当前是否全屏显示
  }

  logout =() =>{
    //显示确认框
    Modal.confirm({
      title:'确认退出吗?',
      onOk: () => {
        this.props.removeUserToken()
      },
      onCancel() {
        console.log('Cancel');
      }
    })
  }

  showWeather = async () => {
    // 请求获取数据
    const {dayPictureUrl, weather} = await reqWeather('北京')
    // 更新状态
    this.setState({
      dayPictureUrl, 
      weather
    })
  }

  handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  componentDidMount(){
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);

    // 请求获取天气信息显示
    this.showWeather()

    // 给screenfull绑定change
    screenfull.onchange(() => {
      // 切换状态数据
      this.setState({
        isFullScreen: !this.state.isFullScreen
      })
    })

  }

  componentWillMount(){
    // 清除定时器
    clearInterval(this.intervalId)
  }


  render() {
    //得到当前请求路径
    const {username, headerTitle} = this.props

    const {currentTime, dayPictureUrl, weather, isFullScreen} = this.state

    return (
      <div className='header'>
        <div className='header-top'>
        <Button size="small" onClick={this.handleFullScreen}>
            <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
          </Button> &nbsp;
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{headerTitle}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={dayPictureUrl}  alt="weather"/>
            <span>{weather}</span>
          </div>

        </div>
      </div>
    )
  }
}

export default Header