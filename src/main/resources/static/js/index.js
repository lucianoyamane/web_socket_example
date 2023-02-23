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

    function displayUserList(id){    
        select("#user-id-label").innerHTML = id;
    }

    function initRequest(initRequestListenerFunction) {
        fetch('http://localhost:8600/register')
            .then((r) => r.json())
            .then((data) => initRequestListenerFunction(data))
            .catch((e) => console.log(e));
    }

    function initRequestListener(id) {
        console.log(id);
        connect()
            .then(() => 
                    stompSubscribe(`/queue/${id}`, (data) => {
                        let mensagem = data.body;
                        console.log("mensagem recebida", id);
                        displayUserList(mensagem);
                    })
                );
    }

    window.addEventListener('load', function(event){
        let connectButton = select("#webchat-connect");
        
        connectButton.addEventListener('click', () => {

            initRequest(initRequestListener);

        });
    });
    
})();