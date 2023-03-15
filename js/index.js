
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
   

    function mainPage(){
        $('#selector').show();
        $('#game, #status, #time_left').css("visibility", "hidden");
    }


    function start_game(){
        $('#selector').hide();
        $('#game, #status').css("visibility" , "visible");
        $('#num_box').val(""); //empty the inputbox
        
        magicNum = Math.floor(Math.random()*100)+1; //generate magic number
        tries = 10; //set tries
        console.log("magic num: " + magicNum);
        $('#status').text("Ingresa un numero:");
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
        t = 10; //game time
        $("#time").html(`${t}s`);   //time set as 60s   
        start_game();   //start game (since uses the same rules)
        $('#time_left').css('visibility', 'visible');   //define as visible the div time_left, for game selection.
        
        interval = setInterval(function(){  //set counter's interval
            if(t<=1 || tries <= 0){  //if 60s has passed or tries are over, the game stops
                clearInterval(interval);    //stops current interval
                tries = 0; 
            }
            t--; //time decrease
            $("#time").html(`${t}s`);   //update screen counter
        },1000);    //1s periods
        
    }

    function send(){
        if(tries > 0){
            answer = $('#num_box').val();   //get answer
            if(answer == ''){
                $('#status').text("no has ingresado ningun valor.");
            }else{
                $('#attempted').show();
                $('#attempted').append(`
                <tr>
                    <td>${11-tries}</td>                   
                    <td>${answer}</td>                
                </tr>`); //show the tries left on screen

                if(magicNum > answer){ //lower number
                    $('#status').text("El numero es muy pequeño! "); 
                    $('#status').append("<b>intentos restantes:<b> " + tries);
                    tries--;
                }else if(magicNum < answer){ //higher number
                    $('#status').text("El numero es muy grande! ");
                    $('#status').append("<b>intentos restantes:<b> " + tries);
                    tries--;
                }else{ //guessed number
                    $('#status').text("Adivinaste el numero magico! ");
                    tries = -1;
                }
                if(tries==0){
                    send(); //show in screen when you lose
                }
            }    
            $('#num_box').focus(); // focus de inputbox

        }else if(tries == 0){
            $('#status').text("No lograste adivinar el número magico, mejor suerte la proxima!");
            tries = -1;
        }
        else{
            alert("el juego a terminado, reinicia para continuar");
        }
        $('#num_box').val("");
    }
})

