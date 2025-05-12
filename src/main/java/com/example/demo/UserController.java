package com.example.demo;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import model.dto.UserDTO;
import model.entity.User;
import service.EmailService;
import service.UserLoginService;
import service.UserRegisterService;
import service.impl.UserLoginServiceImpl;
import service.impl.UserRegisterServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // 允許來自 React 開發伺服器的跨域請求
public class UserController {
	private UserRegisterService userRegisterService = new UserRegisterServiceImpl();
	private UserLoginService userLoginService = new UserLoginServiceImpl();
	private EmailService emailService = new EmailService();
	// src/main/java/com/example/demo/controller/EventController.java

	// 處理註冊
	@PostMapping("/user/register")
	public ResponseEntity<?> register(@RequestBody User user) {
		System.out.println("");
		System.out.println(user);
		String username = user.getUsername();
		String password = user.getHashPassword();
		String email = user.getEmail();

		userRegisterService.addUser(username, password, email);

		// 發送 email
		String emailConfirmLink = "http://localhost:8080/email/confirm?username=" + username;
		emailService.sendEmail(email, emailConfirmLink);

		// 回傳 JSON 格式的回應
		return ResponseEntity.ok().body("{\"message\":\"註冊成功，驗證信已寄出\"}");
	}

	@PostMapping("/user/login")
	public ResponseEntity<?> login(@RequestBody Map<String, String> data, HttpSession session) {
	    System.out.println("login 被觸發了" + data.get("email"));
		String email = data.get("email");
	    String password = data.get("password");
	    String authcode = data.get("authcode");
	    String sesstionAuthCode = session.getAttribute("authcode") + "";  // ""代表轉成字串的簡單寫法 比toString更能防異常 因為不會null
	    
	    String resultMessage = null;
	    try {
	    	System.out.println("我在con 傳的Email是:" + email);
	    	System.out.println("我在con 傳的pass是:" + password);
			UserDTO userDTO = userLoginService.login(email, password, authcode, sesstionAuthCode);
			resultMessage = email + "登入成功";
			//將登入資訊 存到session 中 以便其他頁面可以取得使用者相關資訊
			session.setAttribute("userDTO", userDTO);  // 成功 把新資料覆蓋進去sessrion
			return ResponseEntity.ok(userDTO); 
		} catch (RuntimeException e) {
			session.removeAttribute(email);  //移除異常的舊登入資訊sessrion
			return ResponseEntity.status(401).body(e.getMessage());
		}
	    
	}

}
