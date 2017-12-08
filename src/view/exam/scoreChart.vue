<template>
  <div class="score_chart">
    <Select v-model="exam_id" style="width:200px" class="selector">
      <Option v-for="item in examList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Button type="primary" @click="query">查询</Button>

    <div ref="echart" class="echart"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {get_exams_list,get_score_spread} from '@/api/exam'
  import moment from 'moment'
  export default {
    data() {
      return {
        exam_id: null,
        examList: [
        ],
        axis_data:[],
        data:[]
      }
    },
    methods: {
      query() {
        get_score_spread({exam_id: this.exam_id}).then((response) => {
          console.log(response)
          let data = response.data;
          data.data.forEach((el,index)=>{
            this.axis_data=[];
            this.data = [];
            this.axis_data.push(el.studentNo);
            this.data.push(el.score);
            this.init_charts();
          })
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
    },
    mounted() {
      const animationDuration = 3000

      get_exams_list({}).then((response)=>{
        let data = response.data;

        data.data.forEach((el)=>{
          this.examList.push({value:el.id,label: `${moment(el.examDay * 1000).format('YYYY/MM/DD')} ${el.grade} ${el.subject}` })
        })
      })
    }


  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .score_chart{
    height:100%;
    padding-top:40px;
    .selector{
      margin-left:150px;
    }
  }
  .echart{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 80%;
    height:400px;
  }
</style>
