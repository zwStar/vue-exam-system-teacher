import {_get,_post} from './index'
//增加老师
export const add_teacher = (data)=>{
  let req = {
    url:'teacher/add_teacher.php'
  }
  req.data =data;
  return _post(req);
}


//获取所有老师
export const get_teachers = (data) =>{
  let req = {
    url:'teacher/get_teachers.php'
  }
  req.data = data;
  return _get(req);
}
//删除老师
export const delete_teacher = (data) =>{
  let req = {
    url:'teacher/delete_teacher.php'
  }
  req.data = data;
  return _post(req);
}

//更改老师信息
export const edit_teacher = (data) =>{
  let req = {
    url : 'teacher/edit_teacher.php'
  }
  req.data = data;
  return _post(req);
}
