package service;

import model.dto.UserDTO;

public interface UserLoginService {
	//驗證是否登入成功
	//username,password,authCode  登入三大鑰
	//sessionAuthCode = 目前存在google瀏覽器session 驗證碼
	UserDTO login(String username,String password,String authCode , String sessionAuthCode);

}
