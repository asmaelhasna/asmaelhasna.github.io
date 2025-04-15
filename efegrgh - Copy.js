// Setelah 5 detik, sembunyikan loading page dan tampilkan konten utama
setTimeout(function() {
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');
  
  // Inisialisasi komponen setelah loading selesai
  initAudioControls();
}, 3000);

// Pastikan semua resource telah dimuat
window.addEventListener('load', function() {
  // Jika semua sudah dimuat sebelum timeout, langsung tampilkan konten
  if (document.body.classList.contains('loading')) {
    setTimeout(function() {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 1000);
  }
});

function toggleMenu() {
  const navbarNav = document.querySelector('.navbar-nav');
  navbarNav.classList.toggle('active');
}

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);


jQuery(document).ready(function($) {
  $(".Modern-Slider").slick({
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    dots: true,
    pauseOnDotsHover: true,
    cssEase: 'linear',
    // fade:true,
    draggable: false,
    prevArrow: '<button class="PrevArrow"></button>',
    nextArrow: '<button class="NextArrow"></button>', 
  });
});

const audio = document.getElementById("audio");
const musicBtn = document.getElementById("music-button");
const icon = musicBtn.querySelector("span");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    icon.textContent = "▶️";
  } else {
    audio.play();
    icon.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
});

// Kalau lagu selesai, tombol balik ke play
audio.addEventListener("ended", () => {
  icon.textContent = "▶️";
  isPlaying = false;
});

const video1 = document.getElementById("video1");
const volumeBtn1 = document.getElementById("volume-btn1");
volumeBtn1.addEventListener("click", () => {
  video1.muted = !video1.muted;
  volumeBtn1.textContent = video1.muted ? "🔇" : "🔊";
});

// Initialize components
initMobileMenu();
initAudioControls();
initContactForm();
initSlideshow();

// Mobile Menu
// Improved mobile menu implementation
function initMobileMenu() {
  const navbarNav = document.querySelector('.navbar-nav');
  const menuToggle = document.querySelector('#mobile-menu-toggle');

  if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navbarNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.navbar-nav a').forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

// Audio Controls
function initAudioControls() {
  const playBtn = document.querySelector('[onclick="playAudio()"]');
  const stopBtn = document.querySelector('[onclick="stopMusic()"]');
  const audio = document.getElementById('myAudio');

  if (playBtn && stopBtn && audio) {
    playBtn.addEventListener('click', () => audio.play());
    stopBtn.addEventListener('click', () => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

// Contact Form with EmailJS
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Initialize EmailJS (replace with your actual IDs)
  emailjs.init('YOUR_USER_ID');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm);
      
      contactForm.reset();
      showNotification('Message sent successfully!', 'success');
    } catch (error) {
      console.error('Failed to send message:', error);
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Slideshow Component
function initSlideshow() {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;

  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Initialize
  showSlide(0);
  
  // Auto-play every 5 seconds
  setInterval(nextSlide, 5000);
}

// Helper function for notifications
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Current mobile menu implementation has issues with event propagation
function initMobileMenu() {
  const navbarNav = document.querySelector('.navbar-nav');
  const productMenu = document.querySelector('#product-menu');

  if (productMenu && navbarNav) {
    productMenu.addEventListener('click', (e) => {
      e.stopPropagation();  // This prevents the click from closing the menu immediately
      navbarNav.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      navbarNav.classList.remove('active');
    });
  }
}