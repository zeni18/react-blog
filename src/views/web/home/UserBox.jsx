import React from 'react'

import {Button} from 'antd'
import SvgIcon from '@/components/SvgIcon'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { decodeQuery } from '@/utils'

const PicBox = props => {
  return (
    <div className='pic-box'>
      <img className='vm-pic' src='https://pic1.afdiancdn.com/user/be430046f58211e89c2852540025c377/common/94cfb0c1b4552643759465ca053cfb71_w1500_h400_s816.jpg?imageView2/1/w/1500/h/400' alt='' />
    </div>
  )
}

const UserMenu = props => {
  const location = useLocation()
  const {tab = 'home'} = decodeQuery(location.search)
  const tabs = [
    {
      'name': '主页',
      'search': 'home',
      'default': true,
    },
    {
      'name': '动态',
      'search': 'feed'
    },
    {
      'name': '发电榜',
      'search': 'sponsor'
    },
    {
      'name': '店铺',
      'search': 'shop'
    }
  ]
  return (
    <div className='user-menu'>
      {tabs.map((item, index) => {
        return (
          <div key={index} className={ `user-menu-item ${tab === item.search ? 'user-menu-item-active' : ''}` }>
            <Link to={{pathname: '/', search: `?tab=${item.search}`}}>{item.name}</Link>
            <span className='line-on'></span>
          </div>
        )
      })}
    </div>
  )
}

const VmAvatar = props => {
  return (
    <div className='vm-avatar'>
      <div className='avatar-box'>
        <div className='inner-box'>
          <img src='https://pic1.afdiancdn.com/user/0e814126418311e8870d52540025c377/avatar/42b06c870465a8c3ec22668113bca100_w200_h200_s6.jpeg?imageView2/1/w/120/h/120' alt='' className='vm-pic avatar-img' />
        </div>
      </div>
      <div className='avatar-content'>
        <div className='user-name'>
          <span><a className='avatar-name' href=''> 不知所云之人</a></span>
        </div>
        <div className='user-intro'>
            正在创作 原創插畫，隨筆塗鴉。
        </div>
        <UserMenu/>
      </div>
    </div>
  )
}

const ToolBox = props => {
  return (
    <div className='plan-btn-box'>
      <Button className='sponsor-btn'>￥ 为TA发电</Button>
      <div className='tool-box'>
        <Button type='text' size='small'>
          <SvgIcon type='iconview' style={{ marginRight: 8 }} />
          <span>私信</span>
        </Button>
        <Button type='text' size='small'>
          <SvgIcon type='iconview' style={{ marginRight: 8 }} />
          <span>收藏</span>
        </Button>
        <Button type='text' size='small'>
          <SvgIcon type='iconview' style={{ marginRight: 8 }} />
          <span>分享</span>
        </Button>
        <Button type='text' size='small'>
          <SvgIcon type='iconview' />
        </Button>
      </div>
    </div>
  )
}

const HeaderUserBox = props => {
  return (
    <div className='header-user-box'>
      <div className='inner-box'>
        <VmAvatar/>
        <ToolBox/>
      </div>
    </div>
  )
}

const UserBox = props => {
  return (
    <>
      <PicBox/>
      <HeaderUserBox/>
    </>
  )
}

export default UserBox
