package service.impl;

import dao.UserLoginDAO;
import dao.impl.UserLoginDAOImpl;
import model.dto.UserDTO;
import model.entity.User;
import service.UserLoginService;
import util.HashUtil;

public class UserLoginServiceImpl implements UserLoginService{
	private UserLoginDAO userLoginDAO = new UserLoginDAOImpl();
	@Override
	public UserDTO login(String email, String password, String authCode, String sessionAuthCode) {
		if(!authCode.equals(sessionAuthCode)) { 
			throw new RuntimeException("驗證碼不符");
		}
		User user = userLoginDAO.findUserByEmail(email);
		System.out.println("有沒有進到這裡呢" + user + "user有打印嗎?");
		System.out.println("www是對得:"+password);
		if(user == null) {
			throw new RuntimeException("查無使用者");
		}
		boolean completed = user.getCompleted();
		if(!completed) {
			throw new RuntimeException("信箱未驗證");
		}
		try {
			//登入的密碼 加上資料庫的鹽 混和成 登入密鹽
			String hashPassword = HashUtil.hashPassword(password, user.getHashSalt());
			//資料庫比對
			System.out.println("驗證一下兩處是否相似");
			System.out.println(user.getPassword()); //資料庫的
			System.out.println(hashPassword);
			//比對資料庫密碼 是否等於 混和登入密鹽
			boolean checkPassword = user.getPassword().equals(hashPassword);
			//boolean checkPassword = true;
			if(!checkPassword) {
				throw new RuntimeException("密碼錯誤");
			}
			//驗證成功
			//User 轉 UserDTO
			UserDTO userDTO = new UserDTO();
			userDTO.setId(user.getId());
			userDTO.setUsername(user.getUsername());
			userDTO.setEmail(user.getEmail());
			userDTO.setCompleted(user.getCompleted());
			// 6. 將 userDTO 回傳
			return userDTO;
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		

	}

}
