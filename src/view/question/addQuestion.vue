<template>
  <div class="add_question">
      <!--选择年级-->
      <Row align="middle" type="flex">
        <Col span="12">
        <Select v-model="formData.grade" placeholder="年级">
          <Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      <!--选择科目-->
      <Row>
        <Col span="12">
        <Select v-model="formData.subject" placeholder="科目">
          <Option v-for="item in subjectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      <!--选择题目类型-->
      <Row>
        <Col span="12">
        <Select v-model="formData.type" placeholder="选择题目类型">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      <!--输入问题-->
      <Row>
        <Col>
        <Input v-model="formData.question" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="输入问题"></Input>
        </Col>
      </Row>

      <!--选项 选择题-->
      <Row align="middle" type="flex" v-if="formData.type === 2">
        <Col span="1">
        <span>A:</span></Col>
        <Col span="5">
        <Input v-model="choice_options['A']" placeholder="输入答案选项"></Input></Col>

        <Col span="1">
        <span>B:</span></Col>
        <Col span="5">
        <Input v-model="choice_options['B']" placeholder="输入答案选项"></Input></Col>

        <Col span="1">
        <span>C:</span></Col>
        <Col span="5">
        <Input v-model="choice_options['C']" placeholder="输入答案选项"></Input></Col>

        <Col span="1">
        <span>D:</span></Col>
        <Col span="5">
        <Input v-model="choice_options['D']" placeholder="输入答案选项"></Input></Col>
      </Row>

      <!--输入答案 当是判断题的时候-->
      <Row v-if="formData.type===1">
        <!--判断题 选择对错-->
        <Col span="3">
        <span>选择答案</span></Col>
        <Col>
        <RadioGroup v-model="formData.answer">
          <Radio label="true">
            <span>true</span>
          </Radio>
          <Radio label="false">
            <span>false</span>
          </Radio>
        </RadioGroup>
        </Col>
      </Row>
      <!--输入答案 当是选择题类型的时候-->
      <Row v-else-if="formData.type===2">
        <!--判断题 选择对错-->
        <Col span="3">
        <span>选择答案</span></Col>
        <Col span="16">
        <RadioGroup v-model="formData.answer">
          <Radio label="A">
            <span>A</span>
          </Radio>
          <Radio label="B">
            <span>B</span>
          </Radio>
          <Radio label="C">
            <span>C</span>
          </Radio>
          <Radio label="D">
            <span>D</span>
          </Radio>
        </RadioGroup>
        </Col>
      </Row>
      <!--填空题-->
      <Row v-else>
        <Col>
        <Input v-model="formData.answer" placeholder="输入正确答案,用逗号分离"></Input>
        </Col>
      </Row>
    <Button type="primary" long  @click="ok()">提交</Button>
  </div>
</template>

<script>
  import {add_question} from '@/api/question'

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
        ],  //年级可选列表
        subjectList: [
          {
            label: '语文',
            value: '语文'
          },
          {
            label: '数学',
            value: '数学'
          },
          {
            label: '英语',
            value: '英语'
          }
        ],  //科目可选列表
        typeList: [
          {
            label: '判断题',
            value: 1
          },
          {
            label: '选择题',
            value: 2
          },
          {
            label: '填空题',
            value: 3
          }
        ],      //题目类型
        choice_options: { //选择题选项
          A: '', B: '', C: '', D: ''
        },
        formData: {
          grade: '',  //年级
          subject: '',  //科目
          question: '', //题目
          answer: '',   //答案
          type: null,   //类型
          options: ''   //选项
        }
      }
    },
    methods: {
      ok() {  //提交
        this.formData.options = ''; //因为选项是由数组拼接成字符串提交 因为页面不用每次提交就刷新 所以第二次提交把选项内容清空
        if (this.formData.type === 2) {
          let keys = Object.keys(this.choice_options);
          keys.forEach((key)=>{
            this.formData.options += key + ':' + this.choice_options[key] + ';'
          })
        }
        add_question(this.formData).then((response) => {
          let data =response.data;
          if(data.status ===1 ){
            this.$Message.success(data.message)
          }else{
            this.$Message.error(data.message);
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add_question{
    width: 400px;
    margin:200px 0 0 400px;
  }
  .ivu-row {
    margin: 10px 0;
  }
</style>
