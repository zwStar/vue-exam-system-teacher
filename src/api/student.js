import {_get,_post} from './index'

//增加学生
export const add_student = (data)=>{
  let req = {
    url:'student/add_student.php'
  }
  req.data = data;
  return _post(req);
}

//获取所有学生
export const get_students = (data) =>{
  let req = {
    url:'student/get_students.php'
  }
  req.data = data;
  return _get(req);
}

//删除学生
export const delete_student = (data) =>{
  let req = {
    url:'student/delete_student.php'
  }
  req.data = data;
  return _post(req);
}

//更改学生信息
export const edit_student = (data) =>{
  let req = {
    url : 'student/edit_student.php'
  }
  req.data = data;
  return _post(req);
}


//查询指定学生成绩
export const get_one_score = (data)=>{
  let req = {
    url:'student/get_one_score.php'
  }
  req.data =data;
  return _get(req);
}


