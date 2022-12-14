import React, { useMemo, useEffect, useState, useCallback } from 'react'
import './index.less'
import axios from '@/utils/axios'
import { decodeQuery, translateMarkdown2html } from '@/utils'
import { HOME_PAGESIZE } from '@/utils/config'
import { MessageFilled, MoreOutlined } from 'utils/antdIcon'
// components
import QuickLink from './QuickLink'
import ArticleList from './List'
import ShareBtn from './ShareBtn'

import { Empty, Spin, Input, Button, Popover, Tooltip, List } from 'antd'
import WebPagination from '@/components/Pagination'
import { useMediaQuery } from 'react-responsive'

// hooks
import useFetchList from '@/hooks/useFetchList'
import useRequestLoading from '@/hooks/useAjaxLoading'
import ContributionChart from './Contribution'
import UserBox from './UserBox'
const Home = props => {
  const [loading, setLoading] = useState(true)
  const [dataList, setDataList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const list = useMemo(() => {
    return [...dataList].map(item => {
      // const index = item.content.indexOf('<!--more-->')
      // item.content = translateMarkdown2html(item.content.slice(0, 10))
      return item
    })
  }, [dataList])

  const { keyword } = decodeQuery(props.location.search)

  const fetchData = () => {
    console.log(`fetchData hasMore: ${hasMore}`)
    axios.get('/article/list', { params: {page} })
      .then(response => {
        if (response.rows && response.rows.length > 0) {
          setDataList(prevState => {
            const data = [...prevState, ...response.rows]
            if (response.count <= data.length) setHasMore(false)
            return data
          })
        }
        setPage(page + 1)
        setLoading(false)
      })
      .catch(e => console.log('error'))
  }

  const handleScroll = useCallback(() => {
    const clientHeight = document.documentElement.clientHeight
    const scrollHeight = document.documentElement.scrollHeight
    if ((clientHeight + window.pageYOffset) < scrollHeight || !hasMore) return
    setLoading(true)
  }, [hasMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore])

  useEffect(() => {
    if (!loading || !hasMore) return
    fetchData()
  }, [loading, hasMore])

  const moreContent = (
    <ul className='more-dropdown-menu'>
      <li className='more-dropdown-menu-item'><span>拉黑Ta</span></li>
    </ul>
  )

  return (
    <div className='creator-home'>
      <section className='float-self-avatar'>
        <img src='https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLYoXpoN7jLzDASKg5rC8nTs1oKgqv8krOttZdYwvic6dA2uQrmopSXwCRZcD5Y1lWic0icZykGvuG6A/132' alt='头像' />
      </section>
      <section className='creator-homepage-content'>
        <div className='creator-bg'>
          <section className='unset-creator-bg'>
          </section>
          <section className='creator-mask-bg'>
            <section className='upload-bg-btn' style={{'display': 'none'}}>
              <div className='upload-action'>
                <span className='awesome-font-camera camera'>
                </span>
                <span className='upload-status'>上传背景</span>
              </div>
            </section>
          </section>
        </div>
        <section className='creator-info'>
          <div className='creator-center-info'>
            <div className='creator-avatar' style={{'backgroundImage': 'url(https://zero-radish.oss-cn-beijing.aliyuncs.com/mbd_file_15885080954151588508095379.webp)'}}>
            </div>
            <div className='creator-wrap'>
              <div className='creator-tp-area'>
                <div className='creator-info-detail'>
                  <div className='over-h creator-name'>Lola
                    <span className='user-flag-item'>
                      <img width='16' height='16' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NS45MyA3NS45NSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmNWM1MjA7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT7otYTmupAgMTwvdGl0bGU+PGcgaWQ9IuWbvuWxgl8yIiBkYXRhLW5hbWU9IuWbvuWxgiAyIj48ZyBpZD0i5Zu+5bGCXzEtMiIgZGF0YS1uYW1lPSLlm77lsYIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzUuMzgsNDcuNDVsLTQuODItMTFMNzQsMjcuNjNhNyw3LDAsMCwwLTQtOS4wN2wtOC44MS0zLjQ0TDU2LjM3LDQuMDZBNi43NSw2Ljc1LDAsMCwwLDQ3LjQ1LjU4TDM2LjM4LDUuNDYsMjcuNiwyYTcsNywwLDAsMC05LjA3LDRsLTMuNDEsOC43NEw0LjA2LDE5LjU4QTYuNzYsNi43NiwwLDAsMCwuNTgsMjguNTFMNS40MiwzOS41NiwyLDQ4LjM3YTcsNywwLDAsMCw0LDkuMDhsOC44MSwzLjQ0LDQuODIsMTFhNi43Niw2Ljc2LDAsMCwwLDguOTMsMy40OWwxMS00LjgyTDQ4LjM2LDc0YTcsNywwLDAsMCw5LjA3LTRsMy40Ni04Ljg1LDExLTQuODJhNi44Miw2LjgyLDAsMCwwLDMuNDktOC45MloiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMzIuMzQgNTMuMyAxOC4wMSAzOC44NyAyMS43OSAzNy4xMSAzMS45MSA0NS4wMSA1NC45NSAyMi42NCA1Ny45MiAyMy45NSAzMi4zNCA1My4zIi8+PC9nPjwvZz48L3N2Zz4=' alt='认证用户' className='el-tooltip creator-selected-icon' aria-describedby='el-tooltip-7927' tabindex='0' />
                    </span>
                  </div>
                  <div className='interact-performance'>
                    <span title='查看Ta关注的人' className='label followers'>0 关注 </span>
                    <span className='divider'>
                    </span>
                    <span title='查看关注Ta的人' className='label fans'> 4873 粉丝</span>
                  </div>
                </div>
                <div className='creator-operate'>
                  <Button className='interact-btn'>已关注</Button>
                  <Button className='share-btn'>分享</Button>
                  <Button className='chat-btn' shape='circle' icon={<MessageFilled style={{fontSize: 20, fontWeight: 700}} />} />
                  <Popover style={{padding: 0}} placement='bottomLeft' content={moreContent} title=''><Button className='more-btn' shape='circle' icon={<MoreOutlined style={{fontSize: 20, fontWeight: 700}} />} /></Popover>
                </div>
              </div>
              <div className='creator-bt-area'>
                <ul className='creator-tab-list'>
                  <li className='on-chosen-status'>作品</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='creator-homepage-main'>
          <section className='homepage-main-list'>
            <div className='tags-search'>
              <div className='nav-search-box'>
                <div className='nav-search'>
                  <Input.Search allowClear autoSize={true} style={{ width: '100%', background: '#f4f4f4' }} placeholder='输入关键词，按Enter查作者作品' defaultValue='' />
                </div>
              </div>
            </div>
            <ArticleList list={list} hasMore={hasMore} />
            <Spin tip='Loading...' spinning={loading}>
              <div></div>
            </Spin>
          </section>
          <aside className='homepage-side'>
            <section className='creator-profile-wrapper'>
              <div className='label over-h2'>关于「Lola」</div>
              <div className='content'>
                <span>
                  <span>
                    <span className='tj normal'>法语教育博主</span>
                  </span>
                </span>
              </div>
              <div className='divider'>
              </div>
              <section className='social-links'>
              </section>
            </section>
            <section className='pc-tip-wrapper'>
              <section className='give-tip'>
                <p className='title over-h1'>请「Lola」喝奶茶</p>
                <p className='notice'>创作者将直接收到你的赞赏金额</p>
                <ul className='tip-options'>
                  <li className=''>
                    <section className='img'>
                      <img src='https://mianbaoduo.com/o/imgs/lollipop.png' srcset='/o/imgs/lollipop_2x.png 2x, /o/imgs/lollipop_3x.png 3x' alt='物品' />
                    </section>
                    <p className='amount'>
                      <span className='unit'>¥</span>
                      <span className='value amount-value'>5</span>
                    </p>
                  </li>
                  <li className=''>
                    <section className='img'>
                      <img src='https://mianbaoduo.com/o/imgs/donut.png' srcset='/o/imgs/donut_2x.png 2x, /o/imgs/donut_3x.png 3x' alt='物品' />
                    </section>
                    <p className='amount'>
                      <span className='unit'>¥</span>
                      <span className='value amount-value'>10</span>
                    </p>
                  </li>
                  <li className='selected'>
                    <section className='img'>
                      <img src='https://mianbaoduo.com/o/imgs/bubble_tea.png' srcset='/o/imgs/bubble_tea_2x.png 2x, /o/imgs/bubble_tea_3x.png 3x' alt='物品' />
                    </section>
                    <p className='amount'>
                      <span className='unit'>¥</span>
                      <span className='value amount-value'>20</span>
                    </p>
                  </li>
                  <li className=''>
                    <label for='input-amount'>
                      <section className='img'>
                        <img src='https://mianbaoduo.com/o/_nuxt/img/a3ecdd8.png' srcset='/o/_nuxt/img/86e39b7.png 2x, /o/_nuxt/img/012ecef.png 3x' alt='红包' />
                      </section>
                    </label>
                  </li>
                </ul>
                <Input.TextArea bordered={false} autoComplete={false} maxLength={40} className='message el-textarea' placeholder='请收下我的心意，以后继续加油创作～'></Input.TextArea>
                <Button className='treat' block shape='round' size='large'>我请客</Button>
              </section>
            </section>
          </aside>
        </section>
      </section>
    </div>
  )
}

export default Home
