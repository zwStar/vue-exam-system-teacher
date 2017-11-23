<template>
  <div id="question">
    <Input icon="ios-search"></Input>
    <Button type="primary" @click="show()">增加题目</Button>

    <Modal
      v-model="modal1"
      title="增加题目"
      @on-ok="ok"
      @on-cancel="cancel">
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
    </Modal>
  </div>
</template>

<script>
  import {add_question} from '@/api/request'

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
        ],
        choice_options: {
          A: '', B: '', C: '', D: ''
        },
        formData: {
          grade: '',
          subject: '',
          question: '',
          answer: '',
          teacherNo: '10001',
          type: null,
          options: ''
        }

      }
    },
    methods: {
      ok() {
        if (this.formData.type === 2) {
          let keys = Object.keys(this.choice_options);
          for (let i = 0; i < keys.length; i++) {
              this.formData.options += keys[i] + ':' + this.choice_options[keys[i]]
          }
        }
        console.log('options',this.formData.options)
        add_question(this.formData).then((result) => {
          console.log(result);
        })
      },
      cancel() {
        this.modal1 = false;
      },
      show() {
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
