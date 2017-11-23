import qs from 'qs'
import {_get,_post} from './index'

export const login = (data) =>{
  let req = {
    url:'login.php',
  }
  let root = new FormData();

  for (let key of Object.keys(data)) {
    root.append(key, data[key]);
  }
  req.data =root;
  return _post(req);
};

export const add_student = (data)=>{
  let req = {
    url:'add_student.php'
  }
  let root = new FormData();
  for (let key of Object.keys(data)) {
    root.append(key, data[key]);
  }
  req.data =root;
  return _post(req);
}
//增加老师
export const add_teacher = (data)=>{
  let req = {
    url:'add_teacher.php'
  }
  let root = new FormData();
  for (let key of Object.keys(data)) {
    root.append(key, data[key]);
  }
  req.data =root;
  return _post(req);
}
//增加题目
export const add_question = (data)=>{
  let req = {
    url:'add_question.php'
  }
  req.data =data;
  return _post(req);
}
//添加考试安排
export const add_test = (data)=>{
  let req = {
    url:'add_test.php'
  }
  req.data =data;
  return _post(req);
}

//获取考试
export const get_test = (data)=>{
  let req = {
    url:'get_test.php'
  }
  req.data =data;
  return _get(req);
}
