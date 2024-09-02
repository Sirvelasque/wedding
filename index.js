const targetDate = new Date('December 27, 2024 17:00:00').getTime();

// Seleccionar los spans en el orden de días, horas, minutos y segundos
const spans = document.querySelectorAll('span');

// Función para actualizar el contador
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Actualizar los spans con los valores respectivos
    spans[0].textContent = days;
    spans[1].textContent = hours;
    spans[2].textContent = minutes;
    spans[3].textContent = seconds;

    // Si la cuenta regresiva ha terminado
    if (timeLeft < 0) {
        clearInterval(interval);
        spans[0].textContent = 0;
        spans[1].textContent = 0;
        spans[2].textContent = 0;
        spans[3].textContent = 0;
    }
}

// Actualizar el contador cada segundo
const interval = setInterval(updateCountdown, 1000);

// Inicializa el contador en la carga de la página
updateCountdown();

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function autoShowSlides() {
    slideIndex++;
    showSlides(slideIndex);
}

// Llama a la función `autoShowSlides` cada 5 segundos (5000 milisegundos)
let slideInterval = setInterval(autoShowSlides, 5000);


const playButton = document.querySelector('.play');
const cd = document.querySelector('.cd');
const song = document.getElementById('song');
const currentTimeEl = document.querySelector('.currentTime');
const totalTimeEl = document.querySelector('.totalTime');
const playBar = document.querySelector('.playBar');
const player = document.querySelector(".player");
const btnplay = document.querySelector("#songControll");

// Evento del boton de reproduccion
playButton.addEventListener('click', function() {
    cd.classList.toggle('girando');
    player.classList.toggle('hiddenPlay');
    
    btnplay.classList.toggle("fa-play");
    btnplay.classList.toggle("fa-pause");
    
    // reproducir o pausar
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
});

song.addEventListener('timeupdate', function() {
    const currentTime = formatTime(song.currentTime);
    currentTimeEl.textContent = currentTime;
    const totalTime = formatTime(song.duration);
    totalTimeEl.textContent = totalTime;

    const progressPercent = (song.currentTime / song.duration) * 100;
    playBar.style.width = `${progressPercent}%`;
});

// Formato de tiempo de cancion
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}