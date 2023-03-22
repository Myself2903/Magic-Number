
$('document').ready(function(){
    mainPage();
    
    $('#home_button').on('click', mainPage);    //Return to mainPage
    $('#classic_game').on("click", start_game); //start a classic game  
    $('#timer_game').on("click",start_timer_game); 
    $('#send_button').on("click", send);    //send an answer
    $('form').submit(function(event){       //allows enters as send signal
        event.preventDefault();
        send();
    })
    $('#restart').on("click", function(){
        $('#num_box').focus();
        if($('#time_left').css("visibility") == "visible"){
            start_timer_game(); //restart the timer game
        }else{
            start_game();   //restart the classic game
        }
    });  
    const status_message = $('#status');
   

    function mainPage(){
        $('#selector').show();
        $('#game, #status, #time_left').css("visibility", "hidden");
    }


    function start_game(){
        $('#selector').hide();
        $('#game, #status').css("visibility" , "visible");
        status_message.css({
            'font-size': 'large',
            'color': 'black',
            'margin-top': '5em'
        });
        $('#num_box').val(""); //empty the inputbox
        
        magicNum = Math.floor(Math.random()*100)+1; //generate magic number
        tries = 10; //set tries
        console.log("magic num: " + magicNum);
        status_message.text("Ingresa un numero:");
        $('#attempted').hide();
        $('#attempted').html(`
            <tr>
                <th colspan="2">Valores Intentados</td>
            </tr>`
        );  //restart the values for the attempted table
    }

    let interval; //define interval as a global variable
    function start_timer_game(){
        clearInterval(interval); //stops all previous intervals
        t = 60; //game time
        $("#time").html(`${t}s`);   //time set as 60s   
        start_game();   //start game (since uses the same rules)
        $('#time_left').css('visibility', 'visible');   //define as visible the div time_left, for game selection.
        
        interval = setInterval(function(){  //set counter's interval
            if(t<=1){  //if 60s has passed the game stops
                clearInterval(interval);    //stops current interval
                tries = 0; 
                send(); // send message to show end game    
            }
            
            t--; //time decrease
            $("#time").html(`${t}s`);   //update screen counter
        },1000);    //1s periods
        
    }

    function answerState(ans_state){
        status_message.text(`El numero es muy ${ans_state}! `); 
        tries--;
        status_message.append(`<b>intentos restantes:<b> ${tries}`);
        $(".sound_effect")[0].play();
    }

    function send(){
        if(tries > 0){
            answer = $('#num_box').val();   //get answer
            if(answer == ''){
                status_message.text("no has ingresado ningun valor.");
            }else{
                $('#attempted').show();
                $('#attempted').append(`
                <tr>
                    <td>${11-tries}</td>                   
                    <td>${answer}</td>                
                </tr>`); //show the tries left on screen

                if(magicNum > answer){ //lower number
                    answerState('pequeño');
                }else if(magicNum < answer){ //higher number
                    answerState('grande');
                }else{ //guessed number
                    status_message.text("Felicidades! Adivinaste el numero magico!");
                    status_message.css({
                        'font-size': 'xx-large',
                        'color': 'blue',
                        'margin-top': '2em'
                    });

                    $(".sound_effect")[1].play();

                    if($('#time_left').css('visibility')== 'visible'){ //check if game mode is time limit
                        status_message.html(status_message.html() +`<br><span> En total te tomó ${60-t} segundos</span>`); // show seconds needed to win
                        $('#status span').css({
                            'font-size': 'large',
                            'color': 'black'
                        })    
                        clearInterval(interval);
                    }

                    tries = -1;
                }
                if(tries==0){
                    send(); //show in screen when you lose
                }
            }    
            $('#num_box').focus(); // focus de inputbox

        }else if(tries == 0){
            status_message.text("No lograste adivinar el número magico, mejor suerte la proxima!");
            status_message.css({
                'font-size': 'xx-large',
                'color': 'blue',
                'margin-top': '2em'
            });
            tries = -1;
            $(".sound_effect")[2].play();
            if($('#time_left').css('visibility')== 'visible'){ //check if game mode is time limit    
                clearInterval(interval);
            }
        }
        else{
            alert("el juego a terminado, reinicia para continuar");
        }
        $('#num_box').val("");
    }
})

