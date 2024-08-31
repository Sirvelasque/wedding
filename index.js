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