package br.com.lucianoyamane.web_socket_example.config;

import br.com.lucianoyamane.web_socket_example.domain.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        System.out.println("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println(headerAccessor.getSessionAttributes().toString());
//        String username = (String) headerAccessor.getSessionAttributes().get("username");
//        if(username != null) {
//            Message chatMessage = new Message();
//            chatMessage.setType("Leave");
//            chatMessage.setSender(username);
//            messagingTemplate.convertAndSend("/topic/javainuse", chatMessage);
//        }
    }
}
