package dao;

import model.entity.User;

public interface UserLoginDAO {
	
	User findUserByEmail(String email);

}
