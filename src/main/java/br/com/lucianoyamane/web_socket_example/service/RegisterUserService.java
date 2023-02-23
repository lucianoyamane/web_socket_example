package br.com.lucianoyamane.web_socket_example.service;

import br.com.lucianoyamane.web_socket_example.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RegisterUserService {




    public void execute(String user) {
        UserModel.getInstance().addUser(user);
    }


}
