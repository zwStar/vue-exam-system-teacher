<template>
  <div class="edit_student">
    <Table stripe :columns="columns" :data="student_data"></Table>

    <Modal
      v-model="modal_show"
      title="修改学生信息"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form ref="formInline" :model="formData">
        <FormItem>
          <Input placeholder="学号" v-model="formData.studentNo" disabled></Input>
        </FormItem>
        <FormItem>
          <Input placeholder="姓名" v-model="formData.name"></Input>
        </FormItem>
        <FormItem>
          <RadioGroup v-model="formData.gender">
            <Radio label="男">
              <span>男</span>
            </Radio>
            <Radio label="女">
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Row align="middle" type="flex">
            <Col span="12">
            <Select v-model="formData.grade" placeholder="年级" style="transform:translate(0,0);">
              <Option v-for="item in gradeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col span="2" push="2">
            <Input v-model="formData.classNo"></Input>
            </Col>
            <Col span="6" push="2">
            <span>班</span>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {get_students, delete_student, edit_student} from '@/api/student'

  export default {
    data() {
      return {
        modal_show: false,
        columns: [
          {
            title: '学号',
            key: 'studentNo'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'gender'
          },
          {
            title: '年级',
            key: 'grade'
          },
          {
            title: '班级',
            key: 'classNo'
          },
          {
            title: '操作',
            key: 'action',
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
        student_data: [],   //表格中数据
        gradeList: [        //年级可选列表
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
        formData: {
          grade: '',      //年级
          classNo: '',    //班级号
          studentNo: '',  //学号
          name: '',       //姓名
          gender: ''      //性别
        }
      }
    },
    methods: {
      ok() {        //确定修改信息
        edit_student(this.formData).then((response) => {
          let data = response.data;
          if (data.status === -1) {   //错误
            this.$Message.error(data.message);
          } else {
//            this.student_data.splice(index, 1, this.formData); //通过splice 替换数据 触发视图更新
            this.fetch_student();
            this.$Message.success(data.message);
          }
        })
      },
      cancel() {},
      change(index) { //修改信息 弹出对话框
        this.formData = Object.assign({}, this.student_data[index]) //这样就不会共用同一个对象 不会在编辑表格时 表格中数据跟着改变
        this.modal_show = true;   //显示弹出框
      },
      remove(index) {     //删除某个学生
        let studentNo = this.student_data[index].studentNo;
        delete_student({studentNo}).then((response) => {
          let data = response.data;
          if (data.status === -1) {
            this.$Message.error(data.message);
          } else {
            this.student_data.splice(index, 1); //通过splice 删除数据 触发数组更新
            this.$Message.success(data.message);
          }
        })
      },
      fetch_student(){
        get_students({}).then((response) => {
          let data = response.data;
          this.student_data = data.data;
        })
      }
    },
    mounted() {
      this.fetch_student();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .edit_student {
    margin: 30px 0 0 40px;
    .page {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
