import request from '@/utils/request'

// 请求验证码图片
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  console.log(captchaCode, captchaKey, mobile)
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode, // 验证码
      captchaKey, // 验证码关键字
      mobile // 手机号
    }
  })
}

// 登陆
export const msgLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile, // 手机号
      partyData: {},
      smsCode // 验证码
    }
  })
}
