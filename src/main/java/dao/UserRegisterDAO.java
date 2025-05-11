package dao;

import model.User;
//PP DAO
public interface UserRegisterDAO {
	//新增 User  返回 成功筆數
	int addUser(User user);
	
	
	//email  代表驗證成功並修改 commpleted = true   的筆數的狀態
	int emailConfirmOk (String username);

}
