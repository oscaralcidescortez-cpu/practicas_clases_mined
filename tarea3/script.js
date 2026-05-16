const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const destinationSelect = document.getElementById('destination');
const destinationSummary = document.getElementById('destination-summary');
const form = document.getElementById('travel-form');
const feedback = document.getElementById('form-feedback');
const currentYear = document.getElementById('current-year');
const serviceCards = document.querySelectorAll('.service-card');
const serviceDetail = document.getElementById('service-detail');

const destinationRecommendations = {
  panama: 'Panamá te espera con la ruta del Canal, selvas tropicales y ciudades vibrantes. Ideal para viajes combinados entre naturaleza y cultura urbana.',
  costa_rica: 'Costa Rica ofrece playas, bosques nubosos y turismo sostenible. Perfecto para viajeros que buscan aventura ecológica y fauna exótica.',
  guatemala: 'Guatemala es un destino cultural con mercados típicos y volcanes impresionantes. Recomendado para quienes desean inmersión en tradiciones ancestrales.'
};

const serviceDescriptions = {
  paquetes: {
    title: 'Paquetes a la medida',
    description: 'Creamos itinerarios a tu medida, adaptados al ritmo de tu grupo, tus intereses y tus fechas disponibles para una experiencia sin preocupaciones.'
  },
  soporte: {
    title: 'Soporte local 24/7',
    description: 'Nuestro equipo de guías y coordinadores está disponible en español en cada destino para resolver dudas y ayudarte durante toda tu aventura.'
  },
  eco: {
    title: 'Viajes sostenibles',
    description: 'Seleccionamos alojamientos responsables y actividades con impacto positivo para las comunidades locales y el medio ambiente.'
  }
};

function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
}

function updateYear() {
  currentYear.textContent = new Date().getFullYear();
}

function updateDestinationSummary() {
  const value = destinationSelect.value;
  destinationSummary.textContent = destinationRecommendations[value] || 'Selecciona un destino para recibir una recomendación rápida.';
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showError(input, message) {
  const error = input.parentElement.querySelector('.error-message');
  error.textContent = message;
  input.classList.add('invalid');
}

function clearError(input) {
  const error = input.parentElement.querySelector('.error-message');
  error.textContent = '';
  input.classList.remove('invalid');
}

function clearMessages() {
  feedback.textContent = '';
  feedback.className = 'form-feedback';
  form.querySelectorAll('.error-message').forEach((node) => {
    node.textContent = '';
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  clearMessages();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const dateInput = document.getElementById('travel-date');
  const messageInput = document.getElementById('message');

  let isValid = true;

  if (nameInput.value.trim().length < 2) {
    showError(nameInput, 'Ingresa un nombre válido de al menos 2 caracteres.');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'Ingresa un correo electrónico válido.');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  if (!destinationSelect.value) {
    showError(destinationSelect, 'Selecciona un destino.');
    isValid = false;
  } else {
    clearError(destinationSelect);
  }

  const travelDate = new Date(dateInput.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!dateInput.value || travelDate < today) {
    showError(dateInput, 'Escoge una fecha futura para tu viaje.');
    isValid = false;
  } else {
    clearError(dateInput);
  }

  if (messageInput.value.trim().length < 20) {
    showError(messageInput, 'Escribe al menos 20 caracteres para describir tus necesidades.');
    isValid = false;
  } else {
    clearError(messageInput);
  }

  if (!isValid) {
    feedback.textContent = 'Por favor corrige los campos marcados antes de enviar.';
    feedback.classList.add('error');
    return;
  }

  feedback.textContent = `¡Gracias, ${nameInput.value.trim()}! Hemos recibido tu solicitud para ${destinationSelect.options[destinationSelect.selectedIndex].text} y pronto te enviaremos una propuesta.`;
  feedback.classList.add('success');
  form.reset();
  updateDestinationSummary();
}

function updateServiceDetail({ currentTarget }) {
  const service = currentTarget.dataset.service;
  const data = serviceDescriptions[service];
  if (data) {
    serviceDetail.innerHTML = `<h3>${data.title}</h3><p>${data.description}</p>`;
  }
}

navToggle.addEventListener('click', toggleMenu);
destinationSelect.addEventListener('change', updateDestinationSummary);
form.addEventListener('submit', handleFormSubmit);
serviceCards.forEach((card) => card.addEventListener('click', updateServiceDetail));

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    document.querySelector('.navbar').classList.add('scrolled');
  } else {
    document.querySelector('.navbar').classList.remove('scrolled');
  }
});

updateYear();
updateDestinationSummary();
