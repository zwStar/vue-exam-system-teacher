<template>
  <div id="teacher">
    <Input icon="ios-search"></Input>
    <Button type="primary" @click="show()">增加学生</Button>

    <Modal
      v-model="modal1"
      title="增加教师"
      @on-ok="ok"
      @on-cancel="cancel">
      <Row>
        <Col span="12">
        <Input placeholder="工号" v-model="formData.teachertNo"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <Input placeholder="姓名" v-model="formData.name"></Input></Col>
      </Row>
      <Row>
        <Row>
          <Col span="12">
          <Input placeholder="电话号码" v-model="formData.phone"></Input></Col>
          </Col>
        </Row>
        <Col span="12">
        <Select v-model="formData.grade" placeholder="年级">
          <Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>

      <Row>
        <Col span="12">
        <Select v-model="formData.subject" placeholder="科目">
          <Option v-for="item in subjectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
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
        subjectList:[
          {
            label:'语文',
            value:'语文'
          },
          {
            label:'数学',
            value:'数学'
          },
          {
            label:'英语',
            value:'英语'
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
          name: '',
          gender: '',
          phone:null,
          subject:''
        }
      }
    },
    methods: {
      ok() {
        alert(1)
        console.log(this.formData)
       /* add_student(this.formData).then((result)=>{
          console.log(result);
        })*/
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
