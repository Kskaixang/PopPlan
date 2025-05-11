package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import model.User;
import service.EmailService;
import service.UserRegisterService;
import service.impl.UserRegisterServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // 允許來自 React 開發伺服器的跨域請求
public class userController {
UserRegisterService userRegisterService = new UserRegisterServiceImpl();
private EmailService emailService = new EmailService();
	//src/main/java/com/example/demo/controller/EventController.java
    @PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        System.out.println("");
        System.out.println(user);
        String username = user.getUsername();		
		String password = user.getHashPassword();
		String email = user.getEmail();
        
        userRegisterService.addUser(username,password,email);

		// 發送 email
		String emailConfirmLink = "http://localhost:8080/email/confirm?username=" + username;
		emailService.sendEmail(email, emailConfirmLink);
        
        // 回傳 JSON 格式的回應
        return ResponseEntity.ok().body("{\"message\":\"註冊成功，驗證信已寄出\"}");
    }
    
}
