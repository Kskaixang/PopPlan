package com.example.demo;

import java.io.IOException;
 
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import service.UserRegisterService;
import service.impl.UserRegisterServiceImpl;
//PP
//接收使用者 於email信件中 所按下的確認連結
// "http://local:8080/JavaWebCart/email/confirm?username=Jone"
@WebServlet("/email/confirm")
public class EmailConfirmServletCopy extends HttpServlet{
	
	private UserRegisterService userRegisterService = new UserRegisterServiceImpl();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//得到username
		String username = req.getParameter("username");
		
		//驗證email 注意這邊會修改SQL中 的completed boolean
		userRegisterService.emailConfirmOk(username);
		
		//準備 要給 result.jsp 的資訊
		String resultTitle = "Email驗證結果";
		String resultMessage = "用戶名稱:" + username + "</p>Email驗證成功";
		System.out.println("抵達EmailConfirmServlet"+resultTitle+resultMessage);
		//req.setAttribute("resultTitle", resultTitle);
		//req.setAttribute("resultMessage", resultMessage);
		//req.getRequestDispatcher("/WEB-INF/view/cart/result.jsp").forward(req, resp);
	}
	
}
