<template>
  <div class="add_teacher">
    <h1 class="title">添加教师</h1>
    <Form :model="formData" label-position="left" :label-width="60">
      <FormItem label="工号">
        <Input v-model="formData.teacherNo"></Input>
      </FormItem>
      <FormItem label="密码">
        <Input type="password" v-model="formData.password"></Input>
      </FormItem>
      <FormItem label="姓名">
        <Input v-model="formData.name"></Input>
      </FormItem>
      <FormItem label="号码">
        <Input v-model="formData.phone"></Input>
      </FormItem>
      <FormItem label="性别">
        <RadioGroup v-model="formData.gender">
          <Radio label="男">
            <span>男</span>
          </Radio>
          <Radio label="女">
            <span>女</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="科目">
        <RadioGroup v-model="formData.subject">
          <Radio label="语文">
            <span>语文</span>
          </Radio>
          <Radio label="数学">
            <span>数学</span>
          </Radio>
          <Radio label="英语">
            <span>英语</span>
          </Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <Button type="primary" long  @click="submit()">提交</Button>
  </div>
</template>

<script>
  import {add_teacher} from '@/api/teacher'

  export default {
    data() {
      return {
        formData: {
          teacherNo: '',    //工号
          password: '',     //密码
          name: '',         //姓名
          gender: '',       //性别
          phone: '',        //电话号码
          subject: ''       //科目
        }
      }
    },
    methods: {
      submit() {
        add_teacher(this.formData).then((response) => {
          let data = response.data;
          if (data.status === 1) {
            this.$Message.success(data.message);
            this.formData = {teacherNo: '', password: '', name: '', gender: '', phone: '', subject: ''};
          } else {
            this.$Message.error(data.message);
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add_teacher {
    width: 400px;
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    .title {
      text-align: center;
      margin: 20px 0;
    }
  }
</style>
