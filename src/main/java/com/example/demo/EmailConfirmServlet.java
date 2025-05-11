package com.example.demo;

import java.io.IOException;

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
	    response.sendRedirect("http://localhost:5173/result?username=" + username);
		//得到username  SPBT不需要 
		//String username = req.getParameter("username");
		
		//驗證email 注意這邊會修改SQL中 的completed boolean
		userRegisterService.emailConfirmOk(username);
		
		//準備 要給 result.jsp 的資訊
		//String resultTitle = "Email驗證結果";
		//String message = "用戶名稱:" + username + "</p>Email驗證成功";
		System.out.println("抵達EmailConfirmServlet"+"修改完成");
		
		//req.setAttribute("resultTitle", resultTitle);
		//req.setAttribute("resultMessage", resultMessage);
		//req.getRequestDispatcher("/WEB-INF/view/cart/result.jsp").forward(req, resp);
		//JSON文字 是要給result接收的  問題是 我要怎麼在後端寄送JSON的同時 又讓當下的email/confirm 去到result頁
		return null;
	}
	
}
