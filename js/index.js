
$('document').ready(function(){
    mainPage();
    
    $('#home_button').on('click', mainPage);    //Return to mainPage
    $('#classic_game').on("click", start_game ); //start a classic game   
    $('#send_button').on("click", send);    //send an answer
    $('#restart').on("click", start_game);  //restart the classic game
    $('form').submit(function(event){       //allows enters as send signal
        event.preventDefault();
        send();
    })

    function mainPage(){
        $('#selector').show();
        $('#game, #status').hide();
    }


    function start_game(){
        $('#selector').hide();
        $('#game, #status').show();
        $('#num_box').val("");




        magicNum = Math.floor(Math.random()*100)+1;
        tries = 10;
        console.log("magic num: " + magicNum);
        $('#status').text("Ingresa un numero:");
        $('#attempted').hide();
        $('#attempted').html(`
            <tr>
                <th colspan="2">Valores Intentados</td>
            </tr>`
        );
    }

    function send(){
        answer = $('#num_box').val();

        if(tries > 0){
            if(answer == ''){
                $('#status').text("no has ingresado ningun valor.");
            }else{
                $('#attempted').show();
                $('#attempted').append(`
                <tr>
                    <td>${11-tries}</td>                    
                    <td>${answer}</td>                
                </tr>`);
                if(magicNum > answer){
                    $('#status').text("El numero es muy pequeño! "); 
                    tries--;
                    $('#status').append("<b>intentos restantes:<b> " + tries);
                }else if(magicNum < answer){
                    $('#status').text("El numero es muy grande! ");
                    tries--;
                    $('#status').append("<b>intentos restantes:<b> " + tries);
                }else{
                    $('#status').text("Adivinaste el numero magico! ");
                    tries = -1;
                }
            }    
            $('#num_box').focus();

        }else if(tries < 0){
            alert("el juego a terminado, reinicia para continuar");
        }
        else{
            $('#status').text("Has agotado todos tus intentos, mejor suerte la proxima!");
            tries = -1;
        }
        $('#num_box').val("");
    }
})

