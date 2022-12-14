import React from 'react'
import '@/styles/app.less'
import { Layout, Row, Col, BackTop} from 'antd'

import Header from './header'
import SideBar from './sidebar'
import AppMain from './AppMain'

// 响应式
const siderLayout = { lg: 5, sm: 0}

const contentLayout = { lg: 24, sm: 24}

const WebLayout = props => {
  return (
    <Layout className='app-container'>
      {/* <Header /> */}
      <Row className='app-wrapper'>
        {/* <Col {...siderLayout}>
          <SideBar />
        </Col> */}
        <Col {...contentLayout}>
          <AppMain {...props} />
        </Col>
      </Row>
      <BackTop target={() => document.querySelector('.app-main')} />
    </Layout>
  )
}

export default WebLayout
