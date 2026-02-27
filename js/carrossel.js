document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.getElementById('carrossel');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.indicator');

    let currentSlide = 0;
    let slideInterval;

    // Função para mostrar slide específico
    function showSlide(index) {

        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));


        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        currentSlide = index;
    }

    // Próximo slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }

    // Slide anterior
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
    }

    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });

    // Auto-play
    function startInterval() {
        slideInterval = setInterval(nextSlide, 9000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Iniciar auto-play
    startInterval();

    // Pausar quando o mouse estiver sobre o carrossel
    const carrosselContainer = document.querySelector('.carrossel-container');
    if (carrosselContainer) {
        carrosselContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });

        carrosselContainer.addEventListener('mouseleave', function() {
            startInterval();
        });
    }

    // Swipe em dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;

    carrosselContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    carrosselContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swipe left
            nextSlide();
            resetInterval();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right
            prevSlide();
            resetInterval();
        }
    }
});