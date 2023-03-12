$(document).ready(function() {
    // Configuración de múltiples filas de colores
    initWheel();

    offBtn();

    var balance = 100; // saldo inicial del jugador
    var betvalue = document.getElementById("betvalue"); // Obtener el input de la apuesta

    updateBalance();

    // función para actualizar el saldo del jugador en la página
    function updateBalance() {
        document.querySelector(".money").innerHTML = balance;
    };

    var timeLeft = 25; //tiempo en segundos
    var timerBar = $("#timer-bar");

    // función para establecer temporizador
    function startTimer() {
        var countdown = setInterval(function() {
            timeLeft--;
            var percentageLeft = (timeLeft / 25) * 100;
            timerBar.width(percentageLeft + "%");
            if (timeLeft == 0){               
                clearInterval(countdown);
                setTimeout(startSpin, 1250);
                setTimeout(function() {
                    timeLeft = 25;
                    timerBar.width("100%");
                    setTimeout(startTimer, 200);
                }, 8000);
            }              
        }, 1000);
    }
    
    startTimer();

    betvalue.addEventListener("input", function() {
        var apuesta = parseInt(betvalue.value);
        if(apuesta){
            if(apuesta > 0 && apuesta <= balance) {
                onBtn();
            } else {
                offBtn();
            }
        } else {
            offBtn();
        }
    });

    // función para habilitar los botones de apuesta
    function onBtn(){
        $('.btn-white, .btn-gold, .btn-black, .btn-clean').prop('disabled', false);
    }

    // función para deshabilitar los botones de apuesta
    function offBtn(){
        $('.btn-white, .btn-gold, .btn-black, .btn-clean').prop('disabled', true);
    }

    var selectedValue; // variable global para almacenar el valor del botón seleccionado

    $('.btn-white, .btn-gold, .btn-black').click(function() {
        // Eliminar la clase "active" de todos los botones
        $('.btn-white, .btn-gold, .btn-black').removeClass('active');
        
        // Agregar la clase "active" al botón seleccionado
        $(this).addClass('active');
        
        // Obtener el valor del botón seleccionado por el jugador y almacenarlo en la variable global
        selectedValue = parseInt($(this).attr("value"));
    });

    function startSpin() {
        // desactivar los botones de apuesta y el input
        betvalue.disabled = true;
        offBtn();
        var outcome = Math.floor(Math.random() * 15);
        spinWheel(outcome);
        var bet = parseInt(document.querySelector('.bet').innerText);
        console.log(selectedValue);
        console.log(outcome);
        console.log(bet);

        if(bet > 0){
            //Si el valor del botón y la imagen es 1
            if (selectedValue == 1 && images[outcome].value == 1) {
                balance += (bet * 2);
                setTimeout(function(){
                    updateBalance();
                    alert("¡Felicidades! Ganaste"); 
                }, 6000); 
            } else if (selectedValue == 2 && images[outcome].value == 2){
                balance += (bet * 2);
                setTimeout(function(){
                    updateBalance();
                    alert("¡Felicidades! Ganaste"); 
                }, 6000); 
            } else if (selectedValue == 0 && images[outcome].value == 0){
                balance += (bet * 14);
                setTimeout(function(){
                    updateBalance();
                    alert("¡Felicidades! Ganaste"); 
                }, 6000); 
            }else {
                // el jugador perdió la apuesta
                setTimeout(function(){
                    updateBalance();
                    alert("Lo siento, perdiste tu apuesta.");
                }, 6000); 
            }
        }else{
        }
    }

    var $selector = $('.selector');
    var images = [  
        { name: "Image 1", class:"white", src: "Imagenes/ficha1_1.png", value: 1},
        { name: "Image 2", class:"black", src: "Imagenes/ficha2_1.png", value: 2},
        { name: "Image 3", class:"white", src: "Imagenes/ficha1_2.png", value: 1},
        { name: "Image 4", class:"black", src: "Imagenes/ficha2_2.png", value: 2},
        { name: "Image 5", class:"white", src: "Imagenes/ficha1_3.png", value: 1},
        { name: "Image 6", class:"black", src: "Imagenes/ficha2_3.png", value: 2},
        { name: "Image 7", class:"white", src: "Imagenes/ficha1_4.png", value: 1},
        { name: "Image 8", class:"gold", src: "Imagenes/ficha dorada.png", value: 0},
        { name: "Image 9", class:"black", src: "Imagenes/ficha2_4.png", value: 2},
        { name: "Image 10", class:"white", src: "Imagenes/ficha1_5.png", value: 1},
        { name: "Image 11", class:"black", src: "Imagenes/ficha2_5.png", value: 2},
        { name: "Image 12", class:"white", src: "Imagenes/ficha1_6.png", value: 1},
        { name: "Image 13", class:"black", src: "Imagenes/ficha2_6.png", value: 2},
        { name: "Image 14", class:"white", src: "Imagenes/ficha1_7.png", value: 1},
        { name: "Image 15", class:"black", src: "Imagenes/ficha2_7.png", value: 2}
    ];

    function initWheel(){
	    var $wheel = $('.roulette-wrapper .wheel'),
  		    row = "";
      
            row += "<div class='row'>";
            row += "  <div class='card white' data-id='1'><img src='Imagenes/ficha1_1.png' alt='1'></div>";
            row += "  <div class='card black' data-id='2'><img src='Imagenes/ficha2_1.png' alt='2'></div>";
            row += "  <div class='card white' data-id='1'><img src='Imagenes/ficha1_2.png' alt='3'></div>";
            row += "  <div class='card black' data-id='2'><img src='Imagenes/ficha2_2.png' alt='4'></div>";
            row += "  <div class='card white' data-id='1'><img src='Imagenes/ficha1_3.png' alt='5'></div>";
            row += "  <div class='card black' data-id='2'><img src='Imagenes/ficha2_3.png' alt='6'></div>";
            row += "  <div class='card white' data-id='1'><img src='Imagenes/ficha1_4.png' alt='7'></div>";
            row += "  <div class='card gold' data-id='0'><img src='Imagenes/ficha dorada.png' alt='8'></div>";
            row += "  <div class='card black' data-id='2'><img src='Imagenes/ficha2_4.png' alt='9'></div>";
            row += "  <div class='card white' data-id='1'><img src='Imagenes/ficha1_5.png' alt='10'></div>";
            row += "  <div class='card black' data-id='2'><img src='Imagenes/ficha2_5.png' alt='11'></div>";
            row += "  <div class='card white' data-id='1'><img src='Imagenes/ficha1_6.png' alt='12'></div>";
            row += "  <div class='card black' data-id='2'><img src='Imagenes/ficha2_6.png' alt='13'></div>";
            row += "  <div class='card white' data-id='1'><img src='Imagenes/ficha1_7.png' alt='14'></div>";
            row += "  <div class='card black' data-id='2'><img src='Imagenes/ficha2_7.png' alt='15'></div>";
            row += "</div>";
  
	    for(var x = 0; x < 29; x++){
  	        $wheel.append(row);
        }
    }

    function spinWheel(){
        var $wheel = $('.roulette-wrapper .wheel'),
        order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4],
        position = Math.floor(Math.random() * 15);
              
        //determine position where to land
        var rows = 12,
        card = 75 + 3 * 2,
        landingPosition = (rows * 15 * card) + (position * card);
        
        var randomize = Math.floor(Math.random() * 75) - (75/2);
      
        landingPosition = landingPosition + randomize;
      
        var object = {
            x: Math.floor(Math.random() * 50) / 100,
            y: Math.floor(Math.random() * 20) / 100
        };
    
        $wheel.css({
            'transition-timing-function':'cubic-bezier(0,'+ object.x +','+ object.y + ',1)',
            'transition-duration':'6s',
            'transform':'translate3d(-'+landingPosition+'px, 0px, 0px)'
        });

        // Función que determina la imagen en la posición del selector
        function getSelectedImage() {
    
            // Obtener la posición actual del selector
            var selectorPosition = $selector.offset().left - $wheel.offset().left;
        
            // Calcular el índice de la imagen en esa posición
            var selectedIndex = Math.floor(selectorPosition / card) % images.length;
    
            // Obtener la imagen correspondiente
            var selectedImage = images[selectedIndex];
    
            // Devolver el objeto de imagen
            return selectedImage;
        }

        var previous = ["", "", "", "", "", "", "", "", "", ""];

        // Función que muestra el resultado
        function showResult() {
            // Obtener la imagen seleccionada
            var selectedImage = getSelectedImage();
            console.log(selectedImage);
            previous.shift();
            previous.push(selectedImage);
            prevnumbers(selectedImage); 
        }

        function prevnumbers(selectedImage) {
            for (var i = 0; i < 10; i++) {

                // Obtener el elemento HTML de la celda actual
                var currentCell = document.getElementById(i);
        
                // Obtener el elemento HTML de la celda anterior a la actual
                var previousCell = document.getElementById(i - 1);
        
                // Guardar el contenido de la celda actual en una variable temporal
                var temp = currentCell.innerHTML;
        
                if (previous[i] >= 1 && previous[i] <= 7) {
                    currentCell.innerHTML = previous[i];
                    if (selectedImage) {
                        currentCell.innerHTML = '<img src="'+selectedImage.src+'" width="50"/>';
                    }
                } else if (previous[i] >= 8 && previous[i] <= 14) {
                    currentCell.innerHTML = previous[i];
                    if (selectedImage) {
                        currentCell.innerHTML = '<img src="'+selectedImage.src+'" width="50"/>';
                    }
                } else {
                    currentCell.innerHTML = previous[i];
                    if (selectedImage) {
                        currentCell.innerHTML = '<img src="'+selectedImage.src+'" width="50"/>';
                    }
                }
        
                // Si no estamos en la primera celda, mover el contenido de la celda anterior a la actual
                if (i > 0) {
                    previousCell.innerHTML = temp;
                }
                
            }
        }
        
        setTimeout(function(){
            $wheel.css({
                'transition-timing-function':'',
                'transition-duration':'',
            });
      
            var resetTo = -(position * card + randomize);
            $wheel.css('transform', 'translate3d('+resetTo+'px, 0px, 0px)');
        
            showResult();

        }, 6 * 1000);

        // habilitar los botones de apuesta después de girar la ruleta
        setTimeout(function(){
            betvalue.disabled = false;
            offBtn();
            document.querySelector('.bet').textContent = '0';
            document.querySelector('.monto').value = '';
        }, 8000);
    }

    $('.btn-white').click(function() {
        setCoin('white');
        $('.btn-white').prop('disabled', true);
        $('.btn-gold').prop('disabled', true);
        $('.btn-black').prop('disabled', true);
    });

    $('.btn-gold').click(function() {
        setCoin('gold');
        $('.btn-white').prop('disabled', true);
        $('.btn-gold').prop('disabled', true);
        $('.btn-black').prop('disabled', true);
    });

    $('.btn-black').click(function() {
        setCoin('black');
        $('.btn-white').prop('disabled', true);
        $('.btn-gold').prop('disabled', true);
        $('.btn-black').prop('disabled', true);
    });

    $('.btn-clean').click(function() {
        resetGame();
    });

    // Función que establece la apuesta en el juego
    function setCoin(color){
        var apuesta = parseInt(betvalue.value);
        balance -= apuesta;
        betvalue.value = apuesta;
        document.querySelector(".bet").innerHTML = apuesta;
        updateBalance();
    }

    function resetGame() {
        balance += parseInt(document.querySelector('.bet').textContent);
        document.querySelector('.bet').textContent = '0';
        document.querySelector('.monto').value = '';
        updateBalance();

        // Volver a agregar el listener de input
        betvalue.addEventListener("input", function() {
        var apuesta = parseInt(betvalue.value);
            if(apuesta > 0 && apuesta <= balance) {
                $('.btn-white').prop('disabled', false);
                $('.btn-gold').prop('disabled', false);
                $('.btn-black').prop('disabled', false);
                $('.btn-clean').prop('disabled', false);
            } else {
                $('.btn-white').prop('disabled', true);
                $('.btn-gold').prop('disabled', true);
                $('.btn-black').prop('disabled', true);
                $('.btn-clean').prop('disabled', true);
            }
        });
    }
});

//##################################################################

// const messageList = document.querySelector('.message-list');
// const input = document.querySelector('.textarea');
// const button = document.querySelector('.btn-enviar');

// button.addEventListener('click', () => {
//   const message = input.value;
//   if (message) {
//     const listItem = document.createElement('li');
//     listItem.textContent = message;
//     messageList.appendChild(listItem);
//     input.value = '';
//   }
// });