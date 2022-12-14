import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { calcCommentsCount } from '@/utils'

// components
import { Divider, Empty, Spin, Input, Button, Popover, Tooltip } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import ArticleTag from '@/components/ArticleTag'
import { useMediaQuery } from 'react-responsive'
import { data } from 'autoprefixer'

const ArticleList = props => {
  const history = useHistory()

  const { list, hasMore } = props

  function jumpTo(id) {
    history.push(`/article/${id}`)
  }

  const iphoneScreen = useMediaQuery({
    query: '(max-width: 768px)'
  })

  const Card = props => {
    const { data } = props
    return (
      <li className='hp-work-item pc-hover pc-list-view' onClick={() => jumpTo(data.id)} >
        <a onClick={() => jumpTo(data.id)} className='item-link' target='_blank'>
          <div className='item-top'>
            <a href='' className='copyright-tag pc-copyright-tag' target='_blank'>
            </a>
            <img src={data.coverUrl} alt='作品封面' className='item-photo' />
            <section className='status-bar'>
              <div className='lf-btn-list'>
                {/* <span className='top-status'>置顶</span> */}
              </div>
              <div className='rt-btn-list'>
              </div>
            </section>
          </div>
          <div className='item-bottom grid-top-padding'>
            <section className='item-info'>
              <Tooltip placement='right' title={data.title}>
                <span className='el-tooltip name' aria-describedby='el-tooltip-5608' tabindex='0'>{data.title}</span>
              </Tooltip>
              { iphoneScreen ? <span className='mobile-list-price not-free'>{data.price}</span> : null }
            </section>
            { !iphoneScreen ? <span className='price grid-price not-free'><span>{data.price}</span></span> : null }
            <div className='item-desc'>
              你是否有以下任何一种困扰？说法语时候感到词汇量匮...
            </div>
          </div>
        </a>
      </li>
    )
  }
  console.log(hasMore)

  return (
    <div className='creator-product-list'>
      {/* <div className='card-bucket-section'>
        <p className='cate'>全家桶 ({list.length ?? 0})</p>
        <ul>
          {list.map(item => (
            <Card key={item.id} data = {item} />
          ))}
        </ul>
      </div> */}
      <div className='card-single-section'>
        <p className='cate'>单品 ({list.length ?? 0})</p>
        <ul>
          {list.map(item => (
            <Card data = {item} />
          ))}
        </ul>
        { !hasMore ? <div id='bottomLoad' className='load-bar'><div className='noMore'>---我也是有底线的---</div></div> : null }
      </div>
    </div>
  )
}

export default ArticleList
