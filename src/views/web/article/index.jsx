import React, { useState, useEffect } from 'react'
import './index.less'

import { useMediaQuery } from 'react-responsive'
// methods
import axios from '@/utils/axios'
import formatFileSize from '@/utils/format'
import { translateMarkdown, translateMarkdown2html, calcCommentsCount } from '@/utils'
import useAjaxLoading from '@/hooks/useAjaxLoading'
import { MessageFilled, HomeOutline, CheckOutlined, PlusOutline, ShareAltOutlined } from 'utils/antdIcon'

// components
import { Drawer, Divider, Spin, Button, Alert, Modal } from 'antd'
import ArticleTag from '@/components/ArticleTag'
import SvgIcon from '@/components/SvgIcon'
import Navigation from './Navigation'
import Discuss from '@/components/Discuss'
import { MenuOutlined } from '@ant-design/icons'
import PaymentModal from './PaymentModal'

function Article(props) {
  const [loading, withLoading] = useAjaxLoading()

  const [article, setArticle] = useState({
    title: '',
    content: '',
    tags: [],
    categories: [],
    comments: [],
    createdAt: '',
    viewCount: 0,
    user: null,
    price: null,
    attachments: [],
    resources_count: {},
  })
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      const hash = decodeURI(props.location.hash)
      const ele = document.querySelector(`a[href='${hash}']`)
      ele && hash && ele.click() // 挂载时路由跳转到指定位置
    }, 800)
  }, [])

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      withLoading(axios.get(`/article/${props.match.params.id}`))
        .then(res => {
          const { data } = res
          data.content = (data.content ?? '')
          setArticle(data)
        })
        .catch(e => {
          console.log(e)
          props.history.push('/404')
        })
    } else if (props.match.params.uuid !== undefined) {
      withLoading(axios.get(`/article/share/${props.match.params.uuid}`))
        .then(res => {
          res.content = translateMarkdown2html(res.content ?? '')
          setArticle(res)
        }).catch(e => {
          props.history.push('/404')
        })
    }
  }, [props.match.params.id])

  function setCommentList(list) {
    setArticle({ ...article, comments: list })
  }

  const payment = () => {
    console.log(`payment`)
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = ele => {
    console.log(ele.target)
    setIsModalOpen(false)
  }

  const { title, content, tags, categories, comments, createdAt, viewCount, coverUrl, user, price, attachments, resources_count} = article
  const articleId = parseInt(props.match.params.id)
  const isFoldNavigation = useMediaQuery({ query: '(max-width: 1300px)' })
  const resourcesData = []
  const resourceMap = {
    'audio_num': '音频',
    'video_num': '视频',
    'img_num': '图片',
    'words_num': '文字',
  }
  for (const key in resources_count) {
    if (Object.hasOwnProperty.call(resources_count, key)) {
      const element = resources_count[key]
      if (parseInt(element) > 0) {
        if (resourceMap[key]) {
          resourcesData.push({
            name: resourceMap[key],
            value: element
          })
        }
      }
    }
  }

  return (
    <Spin tip='Loading...' spinning={loading}>
      <article id='radish-page'>
        <Modal title='payment' width={312} style={{ top: '18vh' }} visible={isModalOpen} onCancel={handleCancel} modalRender={modal => {
          return (
            <div class='ant-modal-content' style={{background: 'none', boxShadow: 'none'}}><div class='ant-modal-body' style={{padding: 0}}><PaymentModal/></div></div>
          )
        }}>
        </Modal>
        <header className='radish-top-bar'>
          <section className='inner-top-bar'>
            <div className='logo'>
              <img src='https://mbd.pub/o/_nuxt/img/89ea08f.svg' alt='简售' />
              <span className='bread'>简售</span>
            </div>
            <div className='tab-bar active'>
              <span >简介</span>
            </div>
            <div className='tab-bar'>
              <span >评论</span>
            </div>
            <div className='avatar'>
              <img src='https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLYoXpoN7jLzDASKg5rC8nTs1oKgqv8krOttZdYwvic6dA2uQrmopSXwCRZcD5Y1lWic0icZykGvuG6A/132' alt='' />
            </div>
          </section>
        </header>
        <main className='radish-main-page has-pt'>
          <figure className='product-cover'>
            <img src={coverUrl} alt='作品封面' data-src='https://img.niucodata.com/mbd_2986186104069734142.jpg?imageView2/2/w/1440/format/webp' lazy='loaded'/>
          </figure>
          <section className='product-content has-cover'>
            <section className='upper-title'>
              <section className='title'>
                <span className='permanent-exist-tag'>
                  <span className='awesome-font-yes'>
                  </span>永久回看</span>
                <div className='work-title-wrap'>
                  <p className='work-title'>{title}</p>
                </div>
                <section className='price-statistics'>
                  <div className='price-info'>
                    <span className='value'>
                      <span className='rmb'>
                        <span> {price ? `¥${price}` : ''}</span>
                      </span>
                      <span className='sub'>
                      </span>
                    </span>
                    <span className='count'>
                      <span className='icon awesome-font-file-check'>
                      </span>已有29人购买Ta的作品</span>
                  </div>
                  <section className='report' data-v-083c2978=''>
                    <span>投诉</span>
                    <section className='report-modal'>
                      <div className='el-dialog__wrapper' name='report' height='auto' style={{display: 'none'}}>
                        <div role='dialog' aria-modal='true' aria-label='常见问题' class='el-dialog el-dialog--center' style={{marginTop: '15vh'}}>
                          <div className='el-dialog__header'>
                            <span className='el-dialog__title'>常见问题</span>
                            <button type='button' aria-label='Close' class='el-dialog__headerbtn'>
                              <i className='el-dialog__close el-icon el-icon-close'>
                              </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className='inner-modal'>
                      <div className='el-dialog__wrapper' style={{display: 'none'}}>
                        <div role='dialog' aria-modal='true' aria-label='dialog' class='el-dialog innerDialog' style={{marginTop: '4%'}}>
                          <div className='el-dialog__header'>
                            <span className='el-dialog__title'>
                            </span>
                            <button type='button' aria-label='Close' class='el-dialog__headerbtn'>
                              <i className='el-dialog__close el-icon el-icon-close'>
                              </i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </section>
                </section>
              </section>
            </section>
            <section className='upper-author'>
              <a href='/o/lapizz' className='' target='_blank'>
                <div className='radish-avatar'>
                  <img src={(user?.avatar) === '' ? (user?.avatar) : (user?.gen_avatar)} alt='头像'/>
                </div>
                <span>
                  <span className='name'>{user?.name}</span>
                  <span title={user?.phrase} class='brief'>{user?.phrase}</span>
                </span>
              </a>
              <span className='follow'>
                <Button className='inner follow_hover' icon={<CheckOutlined />}>关注</Button>
                {/* <Button className='inner follow_hover' icon={<PlusOutline style={{fontSize: 12}} />}>关注</Button> */}
              </span>
            </section>
            <section className='banner-field'>
            </section>
            <section className='introduce-inner introduce' id='introduce_content'>
              <span id='introduce-divider' className='tag'>作品简介</span>
              <div className='article-detail' dangerouslySetInnerHTML={{ __html: content }} />
              <section className='bottom-version'>
                <section className='work-publish-time'>创作时间：
                  <span>{createdAt}</span>
                </section>
              </section>
            </section>
            <p className='purchase-notice purchase-divider'>
              <span> {price ? `付费${price}元可获得` : '' }
                <span className='down awesome-font-chevron-double-down'></span>
              </span>
            </p>
            <section className='preview-media preview-media'>
            </section>
            <section className='radish-introduce-statistics content-statistics'>
              <ul>
                {
                  resourcesData.map(data => {
                    return (
                      <li key={data.name}>
                        <span class='label'>{data.name}</span>
                        <span class='count'> {data.value}个</span>
                      </li>
                    )
                  })
                }
                <li className='file-only' style={{display: attachments.length <= 0 ? 'none' : ''}}>
                  <span className='label'>附件</span>
                  <span className='count'>{attachments.length}个</span>
                  <div className='introduct-file-list clearfix'>
                    {attachments.map(attachment => {
                      return (
                        <div key={attachment.id} title='购买后即可解锁该附件' data-poster='https://cdn.2zimu.com/CiAgICAgICAgICA1OTU2NS05NzcyOS1tYmRfZmlsZS0xNjA1NDUyOTQwNjEyLTQzOTgKICAgICAgICA.png' data-sub-html='音频时长统计 PlayTime.exe' class='file-item'>
                          <div className='cover-img' style={{backgroundImage: 'url(https://allow-public.oss-cn-beijing.aliyuncs.com/CiAgICAgICAgICA1OTU2NS05NzcyOS1tYmRfZmlsZS0xNjA1NDUyOTQwNjEyLTQzOTgKICAgICAgICA.png)'}} >
                            <span className='file-layer-size'>{formatFileSize(attachment.size)}</span>
                          </div>
                          <div className='info'>
                            <p className='title over-h'>{attachment.name}</p>
                            <p className='desc over-h'>{attachment.updated_at} 更新</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </li>
              </ul>
            </section>
          </section>
          <footer className='tab-bar'>
            <section className='inner'>
              <ul>
                <li className='entry'>
                  <HomeOutline />
                  <span className='text'>主页</span>
                </li>
                <li className='entry'>
                  <MessageFilled />
                  <span className='text'>私信</span>
                </li>
              </ul>
              <span className='radish-bottom-button' onClick={payment}>购买</span>
            </section>
            <section className='has-bottom-safe-area'>
            </section>
          </footer>
          <section className='follow-us'>
            <section className='pc'>
              <section className='main'>
                <section className='logo'>
                  <a href='https://mbd.pub/o/desk'>
                    <img src='https://mbd.pub/o/_nuxt/img/e987711.png' alt='logo'/>
                  </a>
                </section>
                <section className='qrcode'>
                  <img src='https://allow-public.oss-cn-beijing.aliyuncs.com/mianbaoduogzh.jpeg' alt='公众号'/>
                </section>
                <p className='follow'>关注公众号</p>
                <p className='can'>获取更多</p>
                <hr />
                <a href='https://mbd.pub/'>了解更多</a> <a href='https://mbd.pub/o/explore'>探索面包多</a>
              </section>
              <section className='share'>
                <span>
                  <div role='tooltip' id='el-popover-7312' aria-hidden='true' className='el-popover el-popper' tabindex='0' style={{display: 'none'}}>
                    <ul className='pc-share' urlkey='YpqVlZhp'>
                      <span>
                        <div role='tooltip' id='el-popover-3253' aria-hidden='true' className='el-popover el-popper wechat-works-qrcode' tabindex='0' style={{display: 'none'}}>
                          <section className='wechat-works-url'>
                            <img src='https://mbd.pub/mbd/api/gen_qrcode?content=https://mbd.pub/o/bread/mbd-YpqVlZhp' alt='作品二维码'/>
                            <p data-v-6f4a65b5=''>扫码分享</p>
                          </section>
                        </div>
                        <span className='el-popover__reference-wrapper'>
                          <section className='el-popover__reference' aria-describedby='el-popover-3253' tabindex='0'>
                            <span className='icon' style={{backgroundColor: 'ActiveCaption'}}>
                              <img src='/o/_nuxt/img/3b6999b.svg' alt='微信好友'/>
                            </span>
                          </section>
                        </span>
                      </span>
                      <a href='https://service.weibo.com/share/share.php?url=https://mbd.pub/o/bread/mbd-YpqVlZhp&amp;title=音频时长统计工具&amp;pic=https://img.niucodata.com/mbd_2986186104069734142.jpg&amp;appkey=' target='_blank' rel='noopener noreferrer' className='share-to-weibo'>
                        <span className='icon' style={{backgroundColor: 'rgb(248, 85, 101)'}}>
                          <img src='/o/_nuxt/img/bfccba1.svg' alt='微博'/>
                        </span>
                      </a>
                      <li data-v-6f4a65b5=''>
                        <span className='icon hollow'>
                          <span className='awesome-font-paperclip-light'>
                          </span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Button className='share' block icon={<ShareAltOutlined />}>分享此作品</Button>
                </span>
              </section>
            </section>
          </section>
        </main>
        {/* <Discuss articleId={articleId} commentList={comments} setCommentList={setCommentList} /> */}
      </article>
    </Spin>
  )
}

export default Article
