import {_get,_post} from './index'
//增加题目
export const add_question = (data)=>{
  let req = {
    url:'question/add_question.php'
  }
  req.data =data;
  return _post(req);
}
