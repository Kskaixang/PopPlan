package filter;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
//"/product/*" 路徑規劃的重要性 讓有共通前綴 來過篩
@WebFilter(urlPatterns = {"/GGGGuser/list","/GGGGGproduct/*"})
public class LoginFilter extends HttpFilter{

	@Override
	protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		//因具session中 屬性是否有 UserDTO 物件 來判斷是否已經登入
		HttpSession session = request.getSession();
		if(session.getAttribute("userDTO") == null) {
			
			
			request.setAttribute("resultTitle", "請先登入");
			request.setAttribute("resultMessage", "請先登入");
			request.getRequestDispatcher("/WEB-INF/view/cart/result.jsp").forward(request, response);
			//重導到登入頁
			//response.sendRedirect("/JavaWebCart/user/login");
		} else {
			//by pass 有登入就通過
			chain.doFilter(request, response);
			
		}
	}

}
