<template>
  <div class="add_exam">
    <!--选择学年-->
    <Row align="middle" type="flex">
      <Col span="12">
      <Select v-model="formData.academic_year" placeholder="学年">
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
    <Row align="middle" type="flex">
      <Col span="12">
      <DatePicker @on-change="handleChangeDay"  format="yyyy/MM/dd"  type="date" placeholder="选择日期" style="width: 100%" :options="day_options" ></DatePicker>
      </Col>
      <Col span="12" push="2">
      <TimePicker  @on-change="handleChangeTime" format="HH:mm" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
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
      <Col span="3">
      <span>每道分值:</span>
      </Col>
      <Col span="4">
      <Input placeholder="分值" v-model="formData.judge_question_score"></Input>
      </Col>
    </Row>
    <Row type="flex" align="middle">

      <Col span="2">
      <span>选择题:</span>
      </Col>
      <Col span="4">
      <Input placeholder="选择题" v-model="formData.select_question_num"></Input>
      </Col>
      <Col span="2">
      <span>道</span>
      </Col>
      <Col span="3">
      <span>每道分值:</span>
      </Col>
      <Col span="4">
      <Input placeholder="分值" v-model="formData.select_question_score"></Input>
      </Col>

    </Row>
      <Row type="flex" align="middle">
      <span>填空题:</span>
      </Col>
      <Col span="4">
      <Input placeholder="填空题" v-model="formData.insert_question_num"></Input>
      </Col>
      <Col span="2">
      <span>道</span>
      </Col>
      <Col span="3">
      <span>每道分值:</span>
      </Col>
      <Col span="4">
      <Input placeholder="分值" v-model="formData.insert_question_score"></Input>
      </Col>
    </Row>

    <Button type="primary" long  @click="ok()">提交</Button>
  </div>
</template>

<script>
  import {add_exam} from '@/api/exam'
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
        ],  //年级选项
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
        ],    //科目选项
        genderList: [
          {
            label: '男',
            value: '男'
          },
          {
            label: '女',
            value: '女'
          }
        ],    //性别选项
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
        ],      //类型选项
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
        ],  //学年选项
        examDay:null,       //考试日期 yy/mm形式
        formData: {
          academic_year:'',   //学年
          grade: '',      //年级
          classNo:'',      //班级号
          subject: '',    //科目
          teacherNo: '', //教师工号
          examDay:null,       //考试日期
          startTime:null,     //考试开始时间
          endTime:null,       //考试结束时间
          judge_question_num:0,   //判断题数量
          select_question_num:0,   //选择题数量
          insert_question_num:0,    //填空题数量
          judge_question_score:0,   //判断题分值
          select_question_score:0,  //选择题分值
          insert_question_score:0,  //填空题分值
        },
        day_options:{
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        }
      }
    },
    methods: {
      ok() {  //确定增加
        add_exam(this.formData).then((response)=>{
          let data = response.data;
          if(data.status ===1 ){
            this.$Message.success(data.message)
          }else{
            this.$Message.error(data.message);
          }
        })
      },
      handleChangeTime(time){ //更改考试日期格式
        this.formData.startTime = new Date(this.examDay + ' ' + time[0]).getTime() / 1000;
        this.formData.endTime =   new Date(this.examDay + ' ' + time[1]).getTime() / 1000;
      },
      handleChangeDay(day){   ////更改考试时间格式
        this.examDay = day;
        this.formData.examDay = new Date(day).getTime() / 1000;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add_exam{
    width: 500px;
    margin-left:400px;
    margin-top:200px;
  }
  .ivu-row ,.ivu-row-flex{
    margin: 20px 0;
  }
</style>
