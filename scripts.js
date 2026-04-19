// Initialize Animations
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Carousel
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: false,
    navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
    },
    breakpoints: {
        640: { slidesPerView: 2.2, spaceBetween: 30 },
        1024: { slidesPerView: 3.2, spaceBetween: 40 }
    }
});

function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    const tabs = document.querySelectorAll('.menu-tab');

    // 1. Reset all tabs to "Inactive" state
    tabs.forEach(tab => {
        tab.classList.remove('bg-emerald-800', 'text-white', 'border-emerald-800');
        tab.classList.add('text-stone-800', 'border-stone-200');
    });

    // 2. Set clicked tab to "Active" state
    // We use currentTarget to ensure we catch the button even if a span inside is clicked
    const activeTab = event.currentTarget;
    activeTab.classList.add('bg-emerald-800', 'text-white', 'border-emerald-800');
    activeTab.classList.remove('text-stone-800', 'border-stone-200');

    // 3. Filter Items with a simple fade effect
    items.forEach(item => {
        item.style.opacity = '0';
        setTimeout(() => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
            }
        }, 150);
    })
}
(function () {
    emailjs.init("ahp8XeSoMDXL2p7_W");
})();

window.onload = function () {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Sending...";
            btn.disabled = true;

            emailjs.sendForm('service_st1sebv', 'template_wg2qe8l', this)
                .then(() => {
                    alert('Inquiry sent successfully!');
                    contactForm.reset();
                    btn.innerText = "Sent! Send Another?";
                    btn.disabled = false;
                    btn.classList.replace('bg-white', 'bg-emerald-600');
                    btn.classList.add('text-white');
                }, (error) => {
                    alert('Failed to send inquiry. Please try again.');
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }
}