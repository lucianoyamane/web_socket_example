

var stompClient = null;
var id_value = null;


function initRequestListener(id) {
    console.log(id);
    id_value = id;
    displayId();
    connect()
        .then(() => 
                stompSubscribe(`/queue/${id_value}`, (data) => {
                    let mensagem = data.body;
                    console.log("mensagem recebida", id_value);
                    displayMessage(mensagem);
                })
            );
}

function stompSubscribe(endpoint, callback){ 
    stompClient.subscribe(endpoint, callback)
    return stompClient;
}

function select(str){
    return document.querySelector(str);
}

function displayId(){    
    select("#user-id-label").innerHTML = id_value;
}

function displayMessage(mensagem){    
    select("#user-message-label").innerHTML = mensagem;
}

function initRequest(initRequestListenerFunction) {
    fetch('http://localhost:8600/register')
        .then((r) => r.json())
        .then((data) => initRequestListenerFunction(data))
        .catch((e) => console.log(e));
}

function connect(){ 
    return new Promise((resolve, reject) => {
      stompClient = Stomp.over(new SockJS('/websocket-app'))
      stompClient.connect({}, (frame) => resolve())
    })
}

function sendMessage(event) {
        
    var messageContent = document.querySelector('#chatMessage').value.trim();
    console.log('sendmessage', messageContent);
    console.log(stompClient)

    if (messageContent && stompClient) {
        
        var chatMessage = {
            id : id_value,
            message : document.querySelector('#chatMessage').value
        };

        stompClient.send("/app/message", {}, JSON
                .stringify(chatMessage));
        document.querySelector('#chatMessage').value = '';
    }
    event.preventDefault();
}

window.addEventListener('load', function(event){
    console.log('addEventListener')
    initRequest(initRequestListener);
    var dialogueForm = document.querySelector('#dialogueForm');
    dialogueForm.addEventListener('submit', sendMessage, true)
});