<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="username">
      <Input type="text" v-model="formCustom.username"></Input>
    </FormItem>
    <FormItem label="Password" prop="passwd">
      <Input type="password" v-model="formCustom.passwd"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
      <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>

<script>
  import {login} from '@/api/request'
  import sendData from '@/api/sendData';

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        }
        callback();
      };
      return {
        formCustom: {
          passwd: '',
          username: ''
        },
        ruleCustom: {
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        let that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            login(this.formCustom).then((result)=>{
              console.log(result)
            })
           /* sendData('http://127.0.0.1/system/login.php', {
              passwd: that.formCustom.passwd,
              username: that.formCustom.username,
            }).then(function (data) {
              console.log(data)

            }).catch(function (e) {

            });*/
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
