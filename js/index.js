
$('document').ready(function(){
    init();


    $('form').submit(function(event){
        event.preventDefault();
        send();
    })
    
    $('#send_button').on("click", send);

    $('#restart').on("click", init);

    function init(){
        magicNum = Math.floor(Math.random()*100)+1;
        tries = 10;
        console.log("magic num: " + magicNum);
        $('#status').hide();
        $('#attempted').hide();
        $('#attempted span').text("");
    }

    function send(){
        answer = $('#num_box').val();
        $('#status').show();

        if(tries > 0){
            if(answer == ''){
                $('#status').text("no has ingresado ningun valor.");
            }else{
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
        
                $('#attempted').show();
                $('#attempted span').append(" "+answer);
            }    

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

