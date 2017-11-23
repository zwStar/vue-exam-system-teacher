import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Student from '@/view/student'  //添加学生
import Teacher from '@/view/teacher'  //添加老师
import Question from '@/view/question'  //添加问题
import Test from '@/view/test'    //添加考试
import GetTest from '@/view/testList' //获取考试列表
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:"Login",
      component:Login
    },
    {
      path:'/student',
      name:'Student',
      component:Student
    },
    {
      path:'/teacher',
      name:'Teacher',
      component:Teacher
    },
    {
      path:'/question',
      name:'Question',
      component:Question
    },
    {
      path:'/test',
      name:'Test',
      component:Test
    },
    {
      path:'/getTest',
      name:'GetTest',
      component:GetTest
    }
  ]
})
