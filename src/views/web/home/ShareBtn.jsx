import React from 'react'
import { Button } from 'antd'

const styles = {
  sizeBox: {
    marginTop: 24,
  },
  shareBtn: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginBottom: 24,
  }
}
const ShareBtn = props => {
  return (
    <div>
      <div style={styles.sizeBox}></div>
      <div style={styles.shareBtn}>
        <Button>分享店铺</Button>
      </div>
    </div>
  )
}

export default ShareBtn
