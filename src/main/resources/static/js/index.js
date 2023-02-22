(function(){

    function select(str){
        return document.querySelector(str);
    }

    function stompSubscribe(stompClient, endpoint, callback){ //8
        stompClient.subscribe(endpoint, callback)
        return stompClient
      }

    function connect(){ //1-1
        return new Promise((resolve, reject) => {
          let stompClient = Stomp.over(new SockJS('/websocket-app'))
          stompClient.connect({}, (frame) => resolve(stompClient))
        })
    }

    function stompClientSendMessage(stompClient, endpoint){ // 9
        stompClient.send(endpoint, {}, 'new')
        return stompClient
      }

    function displayUserList(id){    
        select("#user-id-label").innerHTML = id;
      }

    window.addEventListener('load', function(event){
        let connectButton = select("#webchat-connect");

        connectButton.addEventListener('click', () => {
            connect()
                .then((stompClient) => {
                    stompSubscribe(stompClient, '/queue/newMember', (response) => {
                        let id = response.body;
                        displayUserList(id);
                    })
                    stompClientSendMessage(stompClient, '/app/register')
                });
                
                
        });
    });
    
})();