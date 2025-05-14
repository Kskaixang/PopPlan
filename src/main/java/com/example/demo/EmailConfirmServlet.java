package com.example.demo;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import service.UserRegisterService;
import service.impl.UserRegisterServiceImpl;
//PP
//接收使用者 於email信件中 所按下的確認連結
// "http://local:8080/JavaWebCart/email/confirm?username=Jone"
@RestController

@CrossOrigin(origins = "http://localhost:5173") 
public class EmailConfirmServlet {
	//PP
	private UserRegisterService userRegisterService = new UserRegisterServiceImpl();

	//抓到email/confirm?username=???  只有8080會進到這裡
	
	@GetMapping(value = "/email/confirm", produces = "application/json;charset=utf-8")
	public ResponseEntity<Void> confirmEmail(@RequestParam String username, HttpServletResponse response) throws IOException {
	    userRegisterService.emailConfirmOk(username);
	    String encodedUsername = URLEncoder.encode(username, StandardCharsets.UTF_8);
	    response.sendRedirect("http://localhost:5173/result?username=" + encodedUsername);		
		return null;
	}
	
}
