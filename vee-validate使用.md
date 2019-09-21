# 1. 说明
    1). vee-validate是专门用来做表单验证的vue插件
    2). github地址: https://github.com/baianat/vee-validate
# 2. 使用
## 1). 引入
    下载: yarn add vee-validate
    引入插件:
        import Vue from 'vue'
        import VeeValidate from 'vee-validate'
        
        Vue.use(VeeValidate)

## 2). 基本使用
     <input v-model="email" name="myemail" v-validate="'required|email'">
     <span style="color: red;" v-show="errors.has('myemail')">{{ errors.first('myemail') }}</span>
     
     <input v-model="phone" name="phone" v-validate="{required: true,regex: /^1\d{10}$/}">
     <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
     
     const success = await this.$validator.validateAll() // 对所有表单项进行验证
     const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
     
     问题: 提示文本默认都是英文的

## 3). 提示信息本地化
    import zh_CN from 'vee-validate/dist/locale/zh_CN'
    VeeValidate.Validator.localize('zh_CN', {
      messages: zh_CN.messages,
      attributes: {
        phone: '手机号',
        code: '验证码'
      }
    })

## 4). 自定义验证规则
    import VeeValidate from 'vee-validate'
    VeeValidate.Validator.extend('mobile', {
      validate: value => {
        return /^1\d{10}$/.test(value)
      },
      getMessage: field => field + '必须是11位手机号码'
    })


