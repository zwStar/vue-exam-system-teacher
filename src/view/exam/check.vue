<template>
  <div class="check">
    <h1>判断题 （每道题{{pre_judge_score}}分）</h1>
    <div v-for="(list,index) in question_list.judgeList">
      <p class="question">{{index + 1}}. {{list.question}}</p>
      <span>考生答案: {{judge_answer[index]}}</span>
      <span>正确答案:  {{real_judge_answer[index]}}</span>
      <span v-if="judge_answer[index] == real_judge_answer[index]"><Icon type="checkmark"/></span>
      <span v-else><Icon type="close-round"></Icon></span>
    </div>
    <span class="score">获得的判断题总分是: <strong>{{judge_score}}</strong> </span>
    <h1>选择题（每道题{{pre_select_score}}分）</h1>
    <div v-for="(list,index) in question_list.selectList">
      <p class="question">{{index + 1}}. {{list.question}}</p>
      <span>考生答案: {{select_answer[index]}}   </span>
      <span>正确答案:  {{real_select_answer[index]}}</span>
      <span v-if="select_answer[index] == real_select_answer[index]"><Icon type="checkmark"/></span>
      <span v-else><Icon type="close-round"></Icon></span>
    </div>
    <span class="score">获得的选择题总分是: <strong>{{select_score}}</strong> </span>
    <h1>填空题 （每道题{{pre_insert_score}}分）</h1>
    <div v-for="(list,index) in question_list.insertList">
      <p class="question">{{index + 1}}. {{list.question}}</p>
      <p style="margin:10px 0;">考生答案: {{insert_answer[index]}}</p>
      <span>正确答案:  {{real_insert_answer[index]}}</span>
      <Input v-model="insert_score[index]" placeholder="请给分" style="width: 50px"></Input>
    </div>
    <span class="score">获得的填空题总分是: <strong>{{insert_scores}}</strong> </span>
    <p class="score total_score">获得的总分是: <strong>{{total_score}}</strong> </p>
    <Button type="primary" @click="submit()">提交成绩</Button>
  </div>
</template>

<script>
  import {get_exam,submit_checked_exam} from '@/api/exam'
  export default {
    data() {
      return {
        question_list: [],        //问题列表
        judge_answer: [],         //考生判断题答案
        real_judge_answer: [],    //正确的判断题答案
        select_answer: [],        //考生选择题答案
        real_select_answer: [],    //正确的选择题答案
        insert_answer:[],         //考生填空题答案
        real_insert_answer:[],     //正确的填空题答案
        judge_score:0,      //判断题分数
        select_score:0,     //选择题分数
        insert_score:[],     //填空题分数
        pre_judge_score:0,
        pre_select_score:0,
        pre_insert_score:0,
        id:null
      }
    },
    computed:{
      insert_scores(){            //填空题总分
        let score = 0;
        this.insert_score.forEach((el)=>{
          score += Number(el);
        })
        return score;
      },
      total_score(){        //总分
        return this.insert_scores + this.judge_score + this.select_score;
      }
    },
    methods:{
      submit(){
        let id = this.id;
        let score = this.total_score;
        console.log(score,id)
        submit_checked_exam({score,id}).then((result)=>{
          console.log(result);
          let data =result.data;
          if(data.status ===1){
            this.$Message.success(data.message);
            this.$router.go(-1);
          }else{
            this.$Message.error(data.message);
          }
        })
      }
    },
    mounted() {
      get_exam(this.$route.query).then((result)=>{
        console.log(result);
        let data = result.data.data;
        //每道题分数
        this.pre_judge_score=data.judge_question_score;
          this.pre_select_score = data.select_question_score;
          this.pre_insert_score = data.insert_question_score;

        //获取id
        this.id = data.id;
        //获取考生判断题答案
        this.judge_answer = data.judge_answer.split(";").splice(1);
        console.log(this.judge_answer)
        //获取考生选择题答案
        this.select_answer = data.select_answer.split(";").splice(1);
        console.log("select Answer",this.select_answer)
        //获取考生填空题答案
        this.insert_answer = data.insert_answer.split(";").splice(1);

        //获取题目
        let question_list = data.question_list;
        question_list = question_list.replace(/[\r|\n]/g, '');
        this.question_list = JSON.parse(question_list);

        this.real_judge_answer = data.real_judge_answer;
        this.real_select_answer = data.real_select_answer;
        this.real_insert_answer = data.real_insert_answer;

        //计算判断题分数
        this.real_judge_answer.forEach((el,index)=>{
          if(el === this.judge_answer[index])
            this.judge_score +=Number(data.judge_question_score);
        })
        //计算选择题分数
        this.real_select_answer.forEach((el,index)=>{
          if(el === this.select_answer[index])
            this.select_score +=Number(data.select_question_score);
        })
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .check{
    text-align: center;
    h1{
      margin:10px 0;
    }
    .question{
      margin:10px 0;
    }
    .score{
      display: inline-block;
      font-size:20px;
      margin:10px 0;
      strong{
        color:#ff1717;
      }
    }
    .total_score{
      display: block;
    }
  }
</style>
