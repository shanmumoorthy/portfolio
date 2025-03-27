// Toggle Menu Icon and Navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Highlight Active Section in Navbar on Scroll
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Adjusted offset for better accuracy
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document
                    .querySelector('header nav a[href*=' + id + ']')
                    .classList.add('active');
            });
        }
    });

    // Add Sticky Class to Header on Scroll
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Close Navbar When Scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Scroll Reveal Animation
ScrollReveal({
    reset: false, // Set to true if you want animations to reset on scroll
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Reveal Elements with ScrollReveal
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Initialize Typed.js for Dynamic Text in Hero Section
const typed = new Typed('.multiple-text', {
    strings: [
        'CSE Student at NPSBCET',
        'Fullstack Developer'
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


// Skills Section Tooltip Effect
let skillBoxes = document.querySelectorAll('.skill-box');

skillBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        let tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerText = box.dataset.title;
        box.appendChild(tooltip);
        tooltip.style.display = 'block';
    });

    box.addEventListener('mouseleave', () => {
        let tooltip = box.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Google Sheets Form Submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbzFPVGxI-75Ilkm2z_EMuI9ubPlp8-7dQmMzzdPiIunLPPzj3bcY1ohMdT_DfZ3zPwhTA/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = 'Message sent successfully!';
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});
