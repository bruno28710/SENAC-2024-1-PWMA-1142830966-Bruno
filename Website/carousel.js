document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;

        function updateCarousel() {
            items.forEach((item, index) => {
                item.classList.remove('active');
                if (index === currentIndex) {
                    item.classList.add('active');
                }
            });

            const itemWidth = items[0].offsetWidth + 20; // 20px is the margin (10px each side)
            const offset = -(currentIndex * itemWidth - (carousel.offsetWidth / 2 - itemWidth / 2));
            carousel.style.transform = `translateX(${offset}px)`;
        }

        function showNextItem() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }

        setInterval(showNextItem, 3000); // Change item every 3 seconds

        // Initial update
        updateCarousel();
    });
});
