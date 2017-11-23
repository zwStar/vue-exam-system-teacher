<template>
  <div id="student">
    <Input icon="ios-search"></Input>
    <Button type="primary" @click="show()">增加学生</Button>

    <Modal
      v-model="modal1"
      title="增加学生"
      @on-ok="ok"
      @on-cancel="cancel">
      <Row>

        <Col span="12">
        <Input placeholder="学号" v-model="formData.studentNo"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <Input placeholder="姓名" v-model="formData.name"></Input></Col>
      </Row>
      <Row align="middle" type="flex">
        <Col span="12">
        <Select v-model="formData.grade" placeholder="年级">
          <Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="2" push="2">
        <Input placeholder="班级" v-model="formData.classNo"></Input>
        </Col>
        <Col span="6" push="2">
        <span>班</span>
        </Col>
      </Row>
      <Row>
      <Col span="12">
      <Select v-model="formData.gender" placeholder="性别">
        <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
  import {add_student} from '@/api/request'
  export default {
    data() {
      return {
        modal1: true,
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
        ],
        genderList: [
          {
            label: '男',
            value: '男'
          },
          {
            label: '女',
            value: '女'
          }
        ],
        formData:{
          grade: '',
          classNo: null,
          studentNo: '',
          name: '',
          gender: ''
        }

      }
    },
    methods: {
      ok() {
        add_student(this.formData).then((result)=>{
          console.log(result);
        })
      },
      cancel() {
        this.modal1 = false;
      },
      show(){
        this.modal1 = true;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ivu-row {
    margin: 10px 0;
  }
</style>
