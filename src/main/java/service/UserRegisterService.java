package service;

import model.entity.User;

public interface UserRegisterService {
	//新增 User
	void addUser(String username , String password , String email);
	//Email 驗證成功
	void emailConfirmOk(String username);
	
}
