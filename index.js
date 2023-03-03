$(document).ready(function() {
    // setup multiple rows of colours, can also add and remove while spinning but overall this is easier.
    initWheel();

    var balance = 100; // saldo inicial del jugador
    var betvalue = document.getElementById("betvalue"); // Obtener el input de la apuesta

    updateBalance();

    // función para actualizar el saldo del jugador en la página
    function updateBalance() {
        document.querySelector(".money").innerHTML = balance;
    };

    function startSpin() {
        var outcome = Math.floor(Math.random() * 15);
        spinWheel(outcome);
    }

    setInterval(startSpin, 26500);

    var $selector = $('.selector');
    var images = [  
        { name: "Image 1", class:"white", src: "Imagenes/ficha1_1.png", valor: 1},
        { name: "Image 2", class:"black", src: "Imagenes/ficha2_1.png", valor: 8},
        { name: "Image 3", class:"white", src: "Imagenes/ficha1_2.png", valor: 2},
        { name: "Image 4", class:"black", src: "Imagenes/ficha2_2.png", valor: 9},
        { name: "Image 5", class:"white", src: "Imagenes/ficha1_3.png", valor: 3},
        { name: "Image 6", class:"black", src: "Imagenes/ficha2_3.png", valor: 10},
        { name: "Image 7", class:"white", src: "Imagenes/ficha1_4.png", valor: 4},
        { name: "Image 8", class:"gold", src: "Imagenes/ficha dorada.png", valor: 0},
        { name: "Image 9", class:"black", src: "Imagenes/ficha2_4.png", valor: 11},
        { name: "Image 10", class:"white", src: "Imagenes/ficha1_5.png", valor: 5},
        { name: "Image 11", class:"black", src: "Imagenes/ficha2_5.png", valor: 12},
        { name: "Image 12", class:"white", src: "Imagenes/ficha1_6.png", valor: 6},
        { name: "Image 13", class:"black", src: "Imagenes/ficha2_6.png", valor: 13},
        { name: "Image 14", class:"white", src: "Imagenes/ficha1_7.png", valor: 7},
        { name: "Image 15", class:"black", src: "Imagenes/ficha2_7.png", valor: 14}
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
            row += "  <div class='card white' data-id='1'><img src='Imagenes/ficha1_5.png' alt='50'></div>";
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
    }
  
    startSpin();

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