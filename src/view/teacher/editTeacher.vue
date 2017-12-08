<template>
  <div class="edit_teacher">
    <Table stripe :columns="columns" :data="teacher_data"></Table>

    <Modal
      v-model="modal_show"
      title="修改教师信息"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="formData" label-position="left" :label-width="60">
        <FormItem label="工号">
          <Input v-model="formData.teacherNo"></Input>
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="formData.name"></Input>
        </FormItem>
        <FormItem label="号码">
          <Input v-model="formData.phone"></Input>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="formData.gender">
            <Radio label="男">
              <span>男</span>
            </Radio>
            <Radio label="女">
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="科目">
          <RadioGroup v-model="formData.subject">
            <Radio label="语文">
              <span>语文</span>
            </Radio>
            <Radio label="数学">
              <span>数学</span>
            </Radio>
            <Radio label="英语">
              <span>英语</span>
            </Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {get_teachers,delete_teacher,edit_teacher} from '@/api/teacher'
  export default {
    data(){
      return{
        modal_show:false,
        columns:[
          {
            title:'工号',
            key:'teacherNo'
          },
          {
            title:'姓名',
            key:'name'
          },
          {
            title:'性别',
            key:'gender'
          },
          {
            title:'科目',
            key:'subject'
          },
          {
            title:'电话',
            key:'phone'
          },
          {
            title:'操作',
            key:'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.change(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        teacher_data:[],
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
        ],  //年级可选列表
        formData: {
          grade: '',    //年级
          subject:'',   //科目
          teacherNo: '',  //工号
          name: '',       //姓名
          gender: ''      //性别
        },
        change_index:null //修改的信息在表格中的下标
      }
    },
    methods:{
      ok(){     //提交修改
        console.log(this.formData)
        edit_teacher(this.formData).then((response)=>{
          let data = response.data;
          if(data.status === -1){
            this.$Message.error(data.message);
          }else{
            this.teacher_data.splice(this.change_index, 1,this.formData); //通过splice 替换数据 触发视图更新
            this.$Message.success(data.message);
          }
        })
      },
      cancel(){},
      change(index){  //显示修改教师对话框
        this.change_index = index;
        this.formData=Object.assign({}, this.teacher_data[index]) //这样就不会共用同一个对象 不会在编辑表格时 表格中数据跟着改变
        this.modal_show = true;
      },
      remove(index){    //删除教师
        let teacherNo = this.teacher_data[index].teacherNo; //获取该教师工号
        delete_teacher({teacherNo}).then((response)=>{
          let data = response.data;
          if(data.status === -1){
            this.$Message.error(data.message);
          }else{
            this.teacher_data.splice(index, 1); //通过splice 删除数据 触发数组更新
            this.$Message.success(data.message);
          }
        })
      }
    },
    mounted(){
      get_teachers({}).then((response)=>{ //获取所有教师
        console.log(response)
        let data = response.data;
        this.teacher_data = data.data;
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .edit_teacher{
    margin:30px 0 0 40px;
  }
</style>
