<template>
  <div id="test">
    <Input icon="ios-search"></Input>
    <Button type="primary" @click="show()">增加考试</Button>

    <div class="container">
      <Table border :columns="columns" :data="test_arrange_list"></Table>
    </div>
    <!--添加考试部分-->
    <Modal
      v-model="modal1"
      title="增加考试"
      @on-ok="ok"
      @on-cancel="cancel">
      <!--选择学年-->
      <Row align="middle" type="flex">
        <Col span="12">
        <Select v-model="formData.grade" placeholder="学年">
          <Option v-for="item in academicList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>

      <!--选择年级和班级-->
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

    <!--选择日期-->
      <Row align="middle" type="flex" v-model="testDay">
        <Col span="12">
          <DatePicker @on-change="handleChangeDay"  format="yyyy/MM/dd" :value="formData.testDay" type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
        </Col>
        <Col span="12">
        <TimePicker  @on-change="handleChangeTime" :value="formData.testDay" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
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
      <!--题目范围-->
      <Row type="flex" align="middle">
        <Col span="2">
          <span>判断题:</span>
        </Col>
        <Col span="4">
        <Input placeholder="判断题" v-model="formData.judge_question_num"></Input>
        </Col>
        <Col span="2">
        <span>道</span>
        </Col>
        <Col span="2">
        <span>选择题:</span>
        </Col>
        <Col span="4">
        <Input placeholder="选择题" v-model="formData.select_question_num"></Input>
        </Col>
        <Col span="2">
        <span>道</span>
        </Col>
        <Col span="2">
        <span>填空题:</span>
        </Col>
        <Col span="4">
        <Input placeholder="填空题" v-model="formData.insert_question_num"></Input>
        </Col>
        <Col span="2">
        <span>道</span>
        </Col>
      </Row>


    </Modal>
  </div>
</template>

<script>
  import {add_test,get_test} from '@/api/request'
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
        academicList: [
          {
            label: '2017-2018第一学期',
            value: '2017-2018第一学期',
          },
          {
            label: '2017-2018第二学期',
            value: '2017-2018第二学期',
          },
          {
            label: '2018-2019第一学期',
            value: '2018-2019第一学期',
          },
          {
            label: '2018-2019第二学期',
            value: '2018-2019第二学期',
          },
          {
            label: '2019-2020第一学期',
            value: '2019-2020第一学期',
          },
          {
            label: '2019-2020第二学期',
            value: '2019-2020第二学期',
          }
        ],
        testDay:null,
        formData: {
          grade: '',
          subject: '',
          teacherNo: '10001',
          testDay:null,
          startTime:null,
          endTime:null,
          judge_question_num:0,
          select_question_num:0,
          insert_question_num:0
        },
        columns:[
          {
            title:'学年',
            key:'academic_year'
          },
          {
            title:'年级',
            key:'grade'
          },
          {
            title:'科目',
            key:'subject'
          },
          {
            title:'班级',
            key:'classNo'
          },
          {
            title:'日期',
            key:'day'
          },
          {
            title:'时间',
            key:'time'
          },
          {
            title:'操作',
            key:'action',
            width:150,
            align:'center',
            render:(h,params)=>{
              return h('div',[
                h('Button',{
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.action(params.index)
                    }
                  }
                },'修改')
              ])
            }
          }
          ],
        test_arrange_list:[
          {
            academic_year:'2017-2018第一学期',
            grade:'一年级',
            subject:'语文',
            classNo:'2班',
            day:'2017/11/30',
            time:'08:00-10:00'
          },
          {
            academic_year:'2017-2018第一学期',
            grade:'一年级',
            subject:'语文',
            classNo:'2班',
            day:'2017/11/30',
            time:'08:00-10:00'
          },
          {
            academic_year:'2017-2018第一学期',
            grade:'一年级',
            subject:'语文',
            classNo:'2班',
            day:'2017/11/30',
            time:'08:00-10:00'
          }
        ]
      }
    },
    methods: {
      ok() {
        console.log(this.formData)
        add_test(this.formData).then((result)=>{
          console.log(result)
        })
      },
      cancel() {
        this.modal1 = false;
      },
      show() {
        this.modal1 = true;
      },
      handleChangeTime(time){
        console.log(time)
        this.formData.startTime = new Date(this.testDay + ' ' + time[0]).getTime() /1000;
        this.formData.endTime =   new Date(this.testDay + ' ' + time[1]).getTime() / 1000;
      },
      handleChangeDay(day){
        console.log(day)
        this.testDay = day;
        this.formData.testDay = new Date(day).getTime() /1000;
      },
      action(index){
        console.log(index)
      }
    },
    mounted(){
      get_test().then((result)=>{
        console.log(result)
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ivu-row ,.ivu-row-flex{
    margin: 10px 0;
  }
</style>
