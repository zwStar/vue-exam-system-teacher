<template>
  <div class="student_score">
    <div class="container">
      <Input v-model="studentNo" placeholder="请输入学生学号" style="width: 200px"></Input>
      <Select v-model="subject" style="width:200px" placeholder="请输入查询科目">
        <Option v-for="item in subjectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary" @click="query">查询</Button>
    </div>
    <div ref="echart" style="width: 600px;height:400px;" class="echart"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {get_one_score} from '@/api/student'
  export default {
    data(){
      return {
        studentNo:'',   //学号
        subject:'',     //科目
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
        ],  //科目可选列表
        axis_data:[],   //echart 横轴名称
        data:[]         //echart数据
      }
    },
    methods:{
      query(){      //查询学生成绩
        let studentNo = this.studentNo; //学号
        let subject = this.subject;     //科目

        get_one_score({studentNo,subject}).then((response)=>{
          console.log(response)
          let data =response.data;
          this.data = data.data;
          data.data.forEach((el,index)=>{
            this.axis_data.push(`第${index+1}次`);  //echart横轴数据
          })
          this.init_charts();   //初始化echart
        })
      },
      init_charts(){    //初始化echart
        let myChart = echarts.init(this.$refs['echart']);
        let option = {
          title: {
            text: '成绩分布'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['最高成绩']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: this.axis_data
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name:'最高分数',
              type:'line',
              data:this.data,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        };
        myChart.setOption(option)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container{
    margin:20px 0;
    text-align: center;
  }

  .echart{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
</style>
