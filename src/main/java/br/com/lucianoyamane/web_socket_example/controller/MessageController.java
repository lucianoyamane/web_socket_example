package br.com.lucianoyamane.web_socket_example.controller;

import com.google.gson.Gson;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class MessageController {
    @MessageMapping("/message")
    public String sendMessage(@Payload Map<String, String> payload) {
        String id = payload.get("id");
        String message = payload.get("message");
        System.out.println(id + " send: " +message);

        return new Gson().toJson("OK");
    }
}
