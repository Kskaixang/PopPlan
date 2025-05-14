package com.example.demo.temp;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import model.TestJSON;

@RestController
public class testController {
/*
	@GetMapping(value = "/myjson", produces = "application/json;charset=utf-8")
	public ResponseEntity<Object> getBookInfo(TestJSON json) {
		json.setName("測試名");
		json.setGender("測試g");
		return ResponseEntity.ok(json);
	}
	*/
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping(value = "/myjson", produces = "application/json;charset=utf-8")
	public ResponseEntity<Object> getBookInfo() {
		TestJSON json = new TestJSON();
		json.setName("測試名99");
		json.setGender("測試g");
		return ResponseEntity.ok(json);
	}
	@GetMapping(value = "/event/{id}", produces = "application/json;charset=utf-8")
	public void getEventByValue(@PathVariable("id") Integer id) {
	    System.out.println("接收到的 value: " + id); // 這邊會打印出 "接收到的 value: 1"
	   
	}
	
}
