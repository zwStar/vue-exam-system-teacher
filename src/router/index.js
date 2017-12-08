import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index/index'  //主页
import Login from '@/view/login/login'    //登录
import EditStudent from '@/view/student/editStudent'  //编辑学生信息
import AddStudent from '@/view/student/addStudent'  //添加学生
import StudentScore from '@/view/student/studentScore'   //学生成绩

import AddTeacher from '@/view/teacher/addTeacher'  //添加教师
import EditTeacher from '@/view/teacher/editTeacher'  //编辑教师信息
import AddQuestion from '@/view/question/addQuestion'  //添加问题

import AddExam from '@/view/exam/addExam'    //添加考试
import ExamList from '@/view/exam/examList'  //批改试卷
import ScoreChart from '@/view/exam/scoreChart'        //成绩分布

import Check from '@/view/exam/check'  //检查作业

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Index',
      component:Index,
      redirect: '/edit_student',
      children:[
        {
          path:'add_student',
          name:'添加学生',
          component:AddStudent
        },
        {
          path:'student_score',
          name:'学生分数',
          component:StudentScore
        },
        {
          path:'edit_student',
          name:'编辑学生',
          component:EditStudent
        },
        {
          path:'add_teacher',
          name:'添加教师',
          component:AddTeacher
        },
        {
          path:'edit_teacher',
          name:'编辑教师',
          component:EditTeacher
        },
        {
          path:'add_question',
          name:'添加问题',
          component:AddQuestion
        },
        {
          path:'add_exam',
          name:'添加考试',
          component:AddExam
        },
        {
          path:'exam_list',
          name:'试卷列表',
          component:ExamList
        },
        {
          path:'score_chart',
          name:'成绩分布',
          component:ScoreChart
        },
        {
          path:'check',
          name:'进行批改',
          component:Check
        },


      ],

    },
    {
      path:'/login',
      name:"登录",
      component:Login
    }
  ]
})
