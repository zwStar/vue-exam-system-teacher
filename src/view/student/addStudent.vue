<template>
  <div class="add_student">
    <Form  ref="formInline" :model="formData">
      <FormItem>
        <Input placeholder="学号" v-model="formData.studentNo"></Input>
      </FormItem>
      <FormItem>
        <Input placeholder="姓名" v-model="formData.name"></Input>
      </FormItem>
      <FormItem>
        <RadioGroup v-model="formData.gender">
          <Radio label="男">
            <span>男</span>
          </Radio>
          <Radio label="女">
            <span>女</span>
          </Radio>
        </RadioGroup>
      </FormItem>

      <FormItem>
        <Row align="middle" type="flex">
          <Col span="12">
          <Select v-model="formData.grade" placeholder="年级" style="transform:translate(0,0);">
            <Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="2" push="2">
          <Input v-model="formData.classNo"></Input>
          </Col>
          <Col span="6" push="2">
          <span>班</span>
          </Col>
        </Row>
      </FormItem>
      <Button type="primary" long  @click="ok()">提交</Button>
    </Form>
  </div>
</template>

<script>
  import {add_student} from '@/api/student'

  export default {
    data() {
      return {
        gradeList: [
          {
            label: '一年级',
            value: '一年级'
          },
          {
            label: '二年级',
            value: '二年级'
          },
          {
            label: '三年级',
            value: '三年级'
          },
          {
            label: '四年级',
            value: '四年级'
          },
          {
            label: '五年级',
            value: '五年级'
          },
          {
            label: '六年级',
            value: '六年级'
          }
        ],    //年级选择列表
        formData: {
          grade: '',      //年级
          classNo: '',    //班级号
          studentNo: '',  //学号
          name: '',       //姓名
          gender: ''      //性别
        }
      }
    },
    methods: {
      ok() {        //提交
        add_student(this.formData).then((response) => {
          let data = response.data;
          if(data.status === -1){     //出错
            this.$Message.error(data.message);
          }else{
            this.$Message.success(data.message);
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add_student{
    width:400px;
    position:absolute;
    top:30%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .ivu-form-item{
    z-index: 1;
  }
  .ivu-row {
    margin: 10px 0;
  }
</style>
