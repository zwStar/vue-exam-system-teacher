import {_get,_post} from './index'
//添加考试安排
export const add_exam = (data)=>{
  let req = {
    url:'exam/add_exam.php'
  }
  req.data =data;
  return _post(req);
}

//获取试卷列表
export const get_exams = (data)=>{
  let req = {
    url:'exam/get_exams.php'
  }
  req.data = data;
  return _get(req);
}

//获取试卷准备批改
export const get_exam = (data)=>{
  let req = {
    url:'exam/get_one_exam.php'
  }
  req.data = data;
  return _get(req);
}

//提交批改分数
export const submit_checked_exam = (data)=>{
  let req = {
    url:'exam/submit_checked_exam.php'
  }
  req.data = data;
  return _post(req);
}

//获取某次考试的学生成绩情况
export const get_score_spread = (data)=>{
  let req = {
    url:'exam/get_score_spread.php'
  }
  req.data = data;
  return _get(req);
}

//获取考试列表
export const get_exams_list = (data) =>{
  let req = {
    url:'exam/get_exam_list.php',
  }
  req.data = data;
  return _get(req);
}
