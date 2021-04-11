
let slides = Array.from(document.querySelectorAll('.slide'));
let right = document.querySelector('.right');
let left = document.querySelector('.left');
let auto = false;
let interval = 5000;
let slideInterval;

function nextSlide () {
    // Get active slide
    let active = document.querySelector('.active');
    
    // Remove 'active' class
    active.classList.remove('active');
    
    // Check for next slide
    if(active.nextElementSibling) {
        //Add 'active' to next slide
        active.nextElementSibling.classList.add('active');
    } else {
        // Add 'active' to initial slide
        slides[0].classList.add('active');
    }
}

function prevSlide () {
    // Get active slide
    let active = document.querySelector('.active');

    // Remove 'active' class
    active.classList.remove('active');
    
    // Check for previous slide
    if(active.previousElementSibling) {
        //Add 'active' to previous slide
        active.previousElementSibling.classList.add('active');
    } else {
        // Add 'active' to final slide
        slides[slides.length - 1].classList.add('active');
    }
}

// Button events
right.addEventListener('click', e => {
    nextSlide();
    if(auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, interval);
    }
});

left.addEventListener('click', e => {
    prevSlide();
    if(auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, interval);
    }
});

// Auto toggle

let autoBtn = document.querySelector('.ball');
autoBtn.addEventListener('click', toggle);

function toggle (e) {
    if(!e.target.matches('.on')) {
        e.target.classList.add('on');
        auto = true;
    } else {
        e.target.classList.remove('on');
        auto = false;
    }
    if(auto) {
        slideInterval = setInterval(nextSlide, interval);
    } else {
        clearInterval(slideInterval);
    }
}
    