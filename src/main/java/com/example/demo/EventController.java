package com.example.demo;


import org.springframework.web.bind.annotation.*;

import model.entity.Event;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // 允許來自 React 開發伺服器的跨域請求
public class EventController {
	//src/main/java/com/example/demo/controller/EventController.java
    @PostMapping("/events")
    public String createEvent(@RequestBody Event event) {
        System.out.println("接收到的活動標題: " + event.getTitle());
        System.out.println("接收到的活動描述: " + event.getDescription());
        return "活動已接收";
    }
}
