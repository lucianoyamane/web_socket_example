package br.com.lucianoyamane.web_socket_example.model;

import java.util.HashSet;
import java.util.Set;

public class UserModel {
    private static UserModel instance;
    private Set<String> users;

    private UserModel() {
        this.initConnectedUsers();
    }

    private void initConnectedUsers() {
        this.users = new HashSet<>();
    }

    public static UserModel getInstance() {
        if (instance == null) {
            instance = new UserModel();
        }
        return instance;
    }

    public Set<String> getUsers() {
        return users;
    }

    public void addUser(String user) {
        this.users.add(user);
    }
}
