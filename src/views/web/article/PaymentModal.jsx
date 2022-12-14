import React, { useState, useEffect } from 'react'

const PaymentModal = props => {
  return (
    <div className='pc-pay-dialog'>
      <div className='pay-ct'>
        <img src='https://mbd.pub/o/_nuxt/img/262a088.svg' alt='' className='top-pay-logo'/>
        <div className='pay-ct-tp'>
          <section data-v-96f3b992='' className='discount-inner pay-amount'>
            <div data-v-96f3b992='' className='pay-channel'>
              <span data-v-96f3b992=''>支付宝支付</span>
              <span data-v-96f3b992='' className='alipay-text'>
                <span data-v-96f3b992='' className='recomend'>推荐</span>
                首单随机立减，最高至免单
              </span>
            </div>
            <p data-v-96f3b992='' title='承包你所有的作文素材，共160+页，14w+字。（持续更新中）' className='pay-title over-h'>《承包你所有的作文素材，共160+页，14w+字。（持续更新中）》</p>
            <div data-v-96f3b992='' className='pay-divider'></div>
            <section data-v-96f3b992='' className='input-discount-code'>
              <input data-v-96f3b992='' type='text' placeholder='输入优惠券兑换码' autocomplete='nope' maxlength='6' className='' />
              <span data-v-28e7ed43='' data-v-96f3b992='' className='lds-ellipsis loading is-loading' style={{display: 'none'}}>
                <span data-v-28e7ed43=''></span>
                <span data-v-28e7ed43=''></span>
                <span data-v-28e7ed43=''></span>
                <span data-v-28e7ed43=''></span>
              </span>
            </section>
            <div data-v-96f3b992='' className='pay-amount hav-tip'>
              <a data-v-96f3b992='' href='https://mbd.pub/help/#/discount' target='_blank' className='about-discount'>优惠说明<i data-v-96f3b992='' className='awesome-font-question-circle-light'></i></a>
              <span data-v-96f3b992='' className='pay-value'>小计 ¥<span data-v-96f3b992='' className='value'>26.00</span></span>
            </div>
          </section>
        </div>
        <div className='pay-ct-bt'>
          <section data-v-7dc75802='' className='select-purchase-method'>
            <section data-v-7dc75802='' className='pay-qrcode'>
              <div data-v-7dc75802='' className='el-image'><img src='https://mbd.pub/mbd/api/gen_qrcode?content=https%3A%2F%2Fm.niucodata.com%2Fbox_pay%2Fpay.php%3Fuser_id%3D104444%26product_id%3D5053%26from%3Dwx' className='el-image__inner' /></div>
            </section>
            <section data-v-7dc75802='' className='pay-tip'><span data-v-7dc75802=''>打开支付宝扫描二维码</span></section>
            <section data-v-7dc75802='' className='divider'></section> <section data-v-7dc75802='' className='pay-others'><span data-v-7dc75802=''>其它方式</span></section>
            <section data-v-7dc75802='' className='pay-others-method solo'>
              <button data-v-7dc75802='' className='pay-btn wx'><img data-v-7dc75802='' src='/o/_nuxt/img/bdcaa20.svg' alt='' /> <span data-v-7dc75802=''>微信支付</span></button>
              <button data-v-7dc75802='' className='pay-btn stripe'><img data-v-7dc75802='' src='/o/_nuxt/img/5bc9853.svg' alt='' /> <span data-v-7dc75802=''>全球支付</span></button>
            </section>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
