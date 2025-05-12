package service.impl;
//PP
import dao.UserRegisterDAO;
import dao.impl.UserRegisterDAOImpl;
import model.entity.User;
import service.UserRegisterService;
import util.HashUtil;

public class UserRegisterServiceImpl implements UserRegisterService{

	//取得UserRegisterDAO物件實體
	private UserRegisterDAO userRegisterDAO = new UserRegisterDAOImpl();
	
	//取得鹽 
	@Override
	public void addUser(String username , String password , String email) {
		try {
			String hashSalt = HashUtil.generateSalt();
			String hashPassword = HashUtil.hashPassword(password, hashSalt);
			
			//建立物件
			User user = new User();
			user.setUsername(username);
			//注意User物件中部可以存放明碼 購過哈希 與加鹽 (資安)
			user.setHashPassword(hashPassword);
			user.setHashSalt(hashSalt);
			user.setEmail(email);
			//檢查區
			System.out.println("UserService");
			System.out.println("1 "+username + " 2hashPassword : "+hashPassword + " 3hashSalt : "+hashSalt +" 4email "+email);
			//檢查區
			
			
			int rowcount = userRegisterDAO.addUser(user);
			if(rowcount < 1) {
				System.out.println("User新增失敗");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
	}

	@Override
	public void emailConfirmOk(String username) {
		if(username == null) {
			return;
		}
		userRegisterDAO.emailConfirmOk(username);
		
	}

}
