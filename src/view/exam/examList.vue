<template>
  <div class="exam_list">
    <Table :columns="columns" :data="exam_data" class="table"></Table>
  </div>
</template>

<script>
  import moment from 'moment';
  import {get_exams} from '@/api/exam'
  export default {
    data(){
      return {
        columns:[
          {
            title:'学号',
            key:'studentNo'
          },
          {
            title:'时间',
            key:'time'
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
            title:'分数',
            key:'score'
          },
          {
            title:'批阅状态',
            key:'checked'
          },
          {
            title:'操作',
            key:'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled:!(params.row.checked === '未批阅')
                  },
                  on: {
                    click: () => {
                      this.check(params.index)
                    }
                  }
                }, '批阅')
              ]);
            }
          }
        ],
        exam_data:[]
      }
    },
    methods:{
      check(index){
        let id = this.exam_data[index].id;
        let studentNo = this.exam_data[index].studentNo;
        this.$router.push({path:'/check',query:{id,studentNo}});
      }
    },
    mounted(){
      get_exams({}).then((response)=>{
        let data =response.data;
        data.data.forEach((el)=>{
          this.exam_data.push({id:el.exam_id,studentNo:el.studentNo,grade:el.grade,subject:el.subject,score:el.score,checked:el.checked === '0' ? '未批阅':'已批阅',time:moment(el.examDay * 1000).format('YYYY/MM/DD')})
        })
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .exam_list{
    margin-left:30px;
    .table{
      margin-top:10px;
    }
  }
</style>
