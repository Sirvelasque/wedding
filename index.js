const targetDate = new Date('December 27, 2024 17:00:00').getTime();

// Seleccionar los spans en el orden de días, horas, minutos y segundos


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

const playAnimation = () => {
  cd.classList.toggle('girando');
  player.classList.toggle('hiddenPlay');
  
  btnplay.classList.toggle("fa-play");
  btnplay.classList.toggle("fa-pause");
}


// Function to play the audio
function playAudio() {
    // Play the audio
    song.play();
    playAnimation();
    // Remove the event listeners after the first interaction
    document.removeEventListener('click', playAudio);
    document.removeEventListener('keydown', playAudio);
    document.removeEventListener('scroll', playAudio);
    playButton.addEventListener('click', function() {

      playAnimation();
      // reproducir o pausar
      if (song.paused) {
          song.play();
      } else {
          song.pause();
      }
  });
}

// Add event listeners for the first user interaction
document.addEventListener('click', playAudio);
document.addEventListener('keydown', playAudio);
document.addEventListener('scroll', playAudio);


// Evento del boton de reproduccion


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

function smoothScrollDown() {
  setTimeout(() => {
    const scrollingElement = (document.scrollingElement || document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }, 500); // Retraso de 0.5 segundos (500ms)
}


// Selecciona el contenedor agendaAnim
const agendaAnim = document.querySelector('.agendaAnchor');

// Configura el observador
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Si agendaAnim es visible en pantalla
      const agendaItems = document.querySelectorAll('.agendaItem');
      // Agrega la clase 'animation' a cada agendaItem
      agendaItems.forEach(item => {
        item.classList.add('animation');
      });
      
      smoothScrollDown();
      // Si quieres detener la observación después de activar la animación, usa:
      observer.unobserve(agendaAnim);
      
    }
  });
}, {
  rootMargin: '5400px',
  threshold: 1 // El 10% del elemento debe ser visible para activar la animación
});

// Comienza a observar agendaAnim
observer.observe(agendaAnim);

const timer = [
  {
    className: "days",
    label: "Días",
  },
  {
    className: "hours",
    label: "Horas",
  },
  {
    className: "minutes",
    label: "Minutos",
  },
  {
    className: "seconds",
    label: "Segundos",
  },
];

const countdownContainer = document.querySelector(".countdown");
const countToDate = new Date().setHours(new Date().getHours() + 240);
let previous;

function showTimer() {
  timer.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add(element.className);
    div.innerHTML = `
      <div class="flip-card">
        <div class="top">00</div>
        <div class="bottom">00</div>
      </div>
      <p class="title">${element.label}</p>
    `;

    countdownContainer.append(div);
  });
}

showTimer();

setInterval(() => {
  const currentDate = new Date();
  const timeBetweenDates = targetDate - currentDate;
  if (timeBetweenDates !== previous) {
    flipAllCards(timeBetweenDates);
  }
  previous = timeBetweenDates;
}, 1000);

function flipAllCards(timeLeft) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const daysCard = document.querySelector(".days > .flip-card");
  const hoursCard = document.querySelector(".hours > .flip-card");
  const minutesCard = document.querySelector(".minutes > .flip-card");
  const secondsCard = document.querySelector(".seconds > .flip-card");

  flipCard(daysCard, days);
  flipCard(hoursCard, hours);
  flipCard(minutesCard, minutes);
  flipCard(secondsCard, seconds);
}

function flipCard(flipCard, time) {
  time = String(time).padStart(2, "0");
  const currentValue = flipCard.querySelector(".top").innerText;

  if (time == currentValue) return;

  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  topFlip.innerText = currentValue;

  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");
  bottomFlip.innerText = time;

  const topHalf = flipCard.querySelector(".top");
  const bottomHalf = flipCard.querySelector(".bottom");

  topFlip.addEventListener("animationstart", () => {
    topHalf.innerText = time;
  });

  topFlip.addEventListener("animationend", () => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.innerText = time;
    bottomFlip.remove();
  });

  flipCard.appendChild(topFlip);
  flipCard.appendChild(bottomFlip);
}

