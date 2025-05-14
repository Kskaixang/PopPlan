package com.example.demo;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
		System.out.println("此時收到的密碼是? " + user.getPassword());
		System.out.println(user);
		String username = user.getUsername();
		String email = user.getEmail();
		String password = user.getPassword();

		userRegisterService.addUser(username, password, email);

		// 發送 email
				String encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8);
				String emailConfirmLink = "http://localhost:8080/email/confirm?username=" + encodedUsername;
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
			UserDTO userDTO = userLoginService.login(email, password, authcode, sesstionAuthCode);
			resultMessage = email + "登入成功";
			//將登入資訊 存到session 中 以便其他頁面可以取得使用者相關資訊
			session.setAttribute("userDTO", userDTO);  // 成功 把新資料覆蓋進去sessrion
			//檢查一下 這個行為有沒有意義
			System.out.println("從session 看看能不能get東西"+session.getAttribute("userDTO"));
			
			
			
			return ResponseEntity.ok(userDTO); 
		} catch (RuntimeException e) {
			session.removeAttribute(email);  //移除異常的舊登入資訊sessrion
			return ResponseEntity.status(401).body(e.getMessage());
		}
	    
	}
	//http://localhost:8080/user/login/session
	//檢查session存在與否
	@GetMapping("/user/login/session")
	@ResponseBody
	public Object debugSession(HttpSession session) {
	    return session.getAttribute("userDTO");
	}
	
	//登出
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
	    session.invalidate(); // ✅ 清除登入資訊
	    return ResponseEntity.ok("登出成功");
	}

}
