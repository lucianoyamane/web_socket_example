package br.com.lucianoyamane.web_socket_example.controller;

import br.com.lucianoyamane.web_socket_example.service.RegisterUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class MessageController {

    @Autowired
    private RegisterUserService registerUserService;

    @MessageMapping("/register")  //3
    @SendTo("/queue/newMember")
    public String registerUser(final Principal principal){
        this.registerUserService.execute(principal.getName());
        return principal.getName();
    }
}
