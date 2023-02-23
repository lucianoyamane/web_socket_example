package br.com.lucianoyamane.web_socket_example.controller;

import br.com.lucianoyamane.web_socket_example.service.RegisterUserService;
import com.google.gson.Gson;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
public class BootstrapController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private RegisterUserService registerUserService;

    @GetMapping("/register")
    public String registerUser() {
        String id = UUID.randomUUID().toString();
        this.registerUserService.execute(id);
        return new Gson().toJson(id);
    }

    @PostMapping("/message")
    public String sendMessage(@RequestBody Map<String, String> messageBody) {
        String id = messageBody.get("id");
        String message = messageBody.get("message");
        this.simpMessagingTemplate.convertAndSend("/queue/" + id , message);
        return "OK";
    }

}
