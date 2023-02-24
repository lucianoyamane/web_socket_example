(function(){

    function select(str){
        return document.querySelector(str);
    }

    function stompSubscribe(endpoint, callback){ 
        this.stompClient.subscribe(endpoint, callback)
      }

    function connect(){ 
        return new Promise((resolve, reject) => {
          this.stompClient = Stomp.over(new SockJS('/websocket-app'))
          this.stompClient.connect({}, (frame) => resolve())
        })
    }

    function displayId(id){    
        select("#user-id-label").innerHTML = id;
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

    function initRequestListener(id) {
        console.log(id);
        displayId(id);
        connect()
            .then(() => 
                    stompSubscribe(`/queue/adea8903-e294-46c9-9951-e46951eb968f`, (data) => {
                        let mensagem = data.body;
                        console.log("mensagem recebida", id);
                        displayMessage(mensagem);
                    })
                );
    }

    window.addEventListener('load', function(event){
        initRequest(initRequestListener);
    });
    
})();