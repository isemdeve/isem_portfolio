const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// Toggle mobile menu
menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

// Smooth scroll for nav links
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href'); // e.g. "#services"
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile nav after clicking
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

// Smooth scroll for logo (go to Home/Top)
logoLink.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// -------------------- Portfolio Carousel --------------------
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
let index = 0;

const activePortfolio = () => {
  const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
  const portfolioDetails = document.querySelectorAll('.portfolio-detail');

  imgSlide.style.transform = `translateX(calc(${index * -100}%))`;
  portfolioDetails.forEach(detail => detail.classList.remove('active'));
  portfolioDetails[index].classList.add('active');
};

arrowRight.addEventListener('click', () => {
  const portfolioDetails = document.querySelectorAll('.portfolio-detail');
  if (index < portfolioDetails.length - 1) {
    index++;
    arrowLeft.classList.remove('disabled');
  } else {
    index = portfolioDetails.length - 1;
    arrowRight.classList.add('disabled');
  }
  activePortfolio();
});

arrowLeft.addEventListener('click', () => {
  if (index > 0) {
    index--;
    arrowRight.classList.remove('disabled');
  } else {
    index = 0;
    arrowLeft.classList.add('disabled');
  }
  activePortfolio();
});
const skillCards = document.querySelectorAll('.skill-card');

function revealSkills() {
  const triggerBottom = window.innerHeight * 0.85;

  skillCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom){
      card.classList.add('active');
    }
  });
}

/* contact */



window.addEventListener('scroll', revealSkills);
window.addEventListener('load', revealSkills);

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // stop page reload

  const data = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  try {
    let response = await fetch(form.action, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      statusMsg.textContent = "✅ Message sent successfully!";
      statusMsg.style.color = "limegreen";
      form.reset();
    } else {
      statusMsg.textContent = "❌ Oops! Something went wrong.";
      statusMsg.style.color = "red";
    }
  } catch (error) {
    statusMsg.textContent = "⚠️ Network error. Try again later.";
    statusMsg.style.color = "orange";
  }
});

