import {_get,_post} from './index'
//登录
export const login = (data) =>{
  let req = {
    url:'login/login_teacher.php',
  }
  req.data = data;
  return _post(req);
};

//退出登录
export const logout = (data)=>{
  let req = {
    url:'login/logout_teacher.php',
  }
  req.data = data;
  return _post(req);
}
