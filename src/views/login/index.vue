<template>
    <div>
      <van-nav-bar
        title="登录"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="container">
        <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
        </div>

        <div class="form">
          <div class="form-item">
            <input class="inp"
              maxlength="11"
              placeholder="请输入手机号码"
              type="text"
              v-model="mobile">
          </div>
          <div class="form-item">
            <input class="inp"
              maxlength="5"
              placeholder="请输入图形验证码"
              type="text"
              v-model="picCode">
            <img
              v-if="picBase64"
              :src="picBase64"
              @click="getPicCode">
          </div>
          <div class="form-item">
            <input class="inp"
              placeholder="请输入短信验证码"
              type="text" v-model="msgCode">
            <button
              @click="getCode">
              {{ totalSecend === curSecend ? '获取验证码' :  `当前倒计时${ curSecend }秒` }}
            </button>
          </div>
        </div>

        <div class="login-btn"
          @click="login">登录</div>
    </div>

    </div>
  </template>
<script>
import { getPicCode, getMsgCode, msgLogin } from '@/api/login'
export default {
  name: 'loginIndex',
  data () {
    return {
      picCode: '', // 用于提交图片验证码
      picBase64: '', // 用于显示验证码
      picKey: '', // 用于提交
      totalSecend: 5, // 总秒数
      curSecend: 5, // 当前时间
      timer: null, // 定时器id
      mobile: '', // 手机号
      msgCode: '' // 用于提交短信验证码
    }
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picBase64 = base64
      this.picKey = key
    },
    async getCode () {
      // 倒计时之前验证为false则不进行倒计时
      if (!this.validMobileAndPicCode()) {
        return
      }
      // 当定时器不存在时，且总秒数和当前秒数相等时才开启倒计时
      if (!this.timer && this.totalSecend === this.curSecend) {
        // 开启定时器之前获取验证码
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信已发送，请注意查收')
        console.log(res)
        this.timer = setInterval(() => {
          console.log('定时器开启')
          this.curSecend--
          if (this.curSecend < 1) { // 如果小于1，则停掉定时器，并赋值null，且把总秒数复制给当前秒数
            clearInterval(this.timer)
            this.timer = null
            this.curSecend = this.totalSecend
          }
        }, 1000)
      }
    },
    // 倒计时前验证手机号和验证码
    validMobileAndPicCode () {
      // 反向校验手机号是否11位 \d表示数字
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      // 反向校验证码是否4位
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },
    async login () {
      if (!this.validMobileAndPicCode()) {
        return
      }
      // 检验自己输入的验证码（统一规定为：246810，共6位数字）
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入验证码')
        return
      }
      // 登陆请求
      const res = await msgLogin(this.mobile, this.msgCode)
      console.log(res)
      // 把获取的token和userId放入vuex中
      this.$store.commit('user/SETUSERINFO', res.data)
      this.$toast('登录成功')
      // 跳转
      // this.$router.push('/home')
      const url = this.$route.query.backUrl || '/home'
      this.$router.replace(url)
    }
  },
  created () {
    this.getPicCode()
  },
  // 离开当前页面时：清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.container {
  padding: 49px 29px;
  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
