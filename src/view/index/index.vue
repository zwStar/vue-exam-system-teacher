<template>
  <div id="index">
    <div class="layout-header">
      <div class="layout-ceiling">
        <div class="layout-ceiling-main">
          <a href="#">欢迎你 {{name}}</a> |
          <a href="#" @click="logout()">退出登录</a>
        </div>
      </div>
    </div>
    <!--侧栏和主要部分-->
    <div class="layout-main">
      <Row type="flex">
        <Col span="4" class="layout-menu-left">
        <Menu class="menu"  theme="dark" width="auto"  :open-names="['student_manager']"  @on-select="select">
          <div class="layout-logo-left"></div>
          <Submenu name="student_manager">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              学生管理
            </template>
            <MenuItem name="/add_student">增加学生</MenuItem>
            <MenuItem name="/edit_student">编辑学生</MenuItem>
            <MenuItem name="/student_score">学生成绩</MenuItem>
          </Submenu>
          <Submenu name="question_manager">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              题库管理
            </template>
            <MenuItem name="/add_question">新增题库</MenuItem>
          </Submenu>
          <Submenu name="exam_manager">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              考试管理
            </template>
            <MenuItem name="/add_exam">安排考试</MenuItem>
            <MenuItem name="/exam_list">批改试卷</MenuItem>
            <MenuItem name="/score_chart">成绩情况</MenuItem>
          </Submenu>
          <Submenu name="teacher_manager">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              教师管理
            </template>
            <MenuItem name="/add_teacher">添加教师</MenuItem>
            <MenuItem name="/edit_teacher">编辑教师</MenuItem>
          </Submenu>
        </Menu>
        </Col>
        <Col span="19" class="layout-right">
          <router-view></router-view>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
  import {logout} from '@/api/login'
  export default {
    data(){
      return {
        teacherNo:'', //学号
        name:''       //姓名
      }
    },
    methods:{
      select(name){
       console.log(this.$router.push({path:name}));
     },
      logout(){
        logout({}).then((result)=>{
          let data = result.data;
          if(data.status ===1){
            localStorage.removeItem('name');
            localStorage.removeItem('teacherNo');
            this.$router.push({path:'/login'});
            this.$Message.success(data.message);
          }else{
            this.$Message.error('退出登录失败，请重试');
          }

        })
      }
    },
    mounted(){
      this.teacherNo = localStorage.getItem('teacherNo');
      this.name = localStorage.getItem('name');

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .layout-header{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .layout-ceiling{
    background: #464c5b;
    padding: 15px 0;
    overflow: hidden;
  }
  .layout-ceiling-main{
    float: right;
    margin-right: 15px;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }

  .layout-main{
    position:fixed;
    top:47px;
    left:0;
    right:0;
    bottom:0;
    .ivu-row-flex{
      height:100%;
      .layout-menu-left{
        background: #495060;
      }
    }
    .layout-right{
      flex:1;
      overflow-y : scroll;
    }
  }
</style>
