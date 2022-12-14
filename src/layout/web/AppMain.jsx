import React from 'react'
import { Alert } from 'antd'
import { ANNOUNCEMENT } from '@/config'
import { useMediaQuery } from 'react-responsive'

function AppMain(props) {
  const iphoneScreen = useMediaQuery({
    query: '(max-width: 576px)'
  })

  const ipadScreen = useMediaQuery({
    query: '(min-width: 576px) and (max-width: 992px)'
  })

  return (
    <div className='app-main'>
      {props.children}
    </div>
  )
}

export default AppMain
