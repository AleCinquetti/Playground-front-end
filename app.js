$( document ).ready(function() {
    //Slider
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            },
            1440: {
                items: 1
            }
        }
    })
});

const jsonList = [
    './ajax/tab1.json',
    './ajax/tab2.json',
    './ajax/tab3.json'
] 

//simulazione fetch file JSON
async function getData(i) {
    const response = await fetch(i);
    const data = await response.json();
    // console.log(data);
    const tabContent = document.createElement('p');
    tabContent.classList.add('faq-text');
    const id = i.charAt(10);
    tabContent.setAttribute('id', `a${id}`);
    tabContent.textContent = data.item.content.join('');
    document.querySelector('.faq-content').append(tabContent);
}

for (var i = 0; i < jsonList.length; i++) {
    getData(jsonList[i]);
}

// Cambio background navbar dopo lo scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('header');
    nav.classList.toggle('scrolled', window.scrollY > 0);
});


//stile navbar (vista mobile)
const hamMenu = document.getElementById('ham');
const navMenu = document.querySelector('.nav-menu');
const menuItem = document.querySelectorAll('.nav-items');
const nav = document.querySelector('header');

hamMenu.addEventListener('click', function() {

    if(! nav.classList.contains('black-bg')) {
        nav.classList.add('black-bg')
    } else {
        nav.classList.remove('black-bg')
    }
    navMenu.classList.toggle('toggled');
})

menuItem.forEach(item => {
    item.addEventListener('click', function() {
        navMenu.classList.remove('toggled');
    })
})

//cookies
const cookiesBtn = document.getElementById('cookies-btn');
const cookies = document.querySelector('.cookies')
cookiesBtn.addEventListener('click', function() {
    cookies.classList.add('hide');
})



//validazione form
const form = document.getElementById('contact-form');
const message = document.getElementById('message');
const email = document.getElementById('email');

form.addEventListener('submit', e => {
	e.preventDefault();	
	checkInputs();
});

function checkInputs() {

	const emailValue = email.value.trim();
    const msgValue = message.value.trim();
    const error = document.getElementById('error');

    if (emailValue === '' && !isEmail(emailValue) && (msgValue === '' )) {
        email.style.borderColor = 'red';
        message.style.borderColor = 'red';
        error.innerHTML = 'compila i campi richiesti';
        error.classList.remove('hide');
    } else if (emailValue === '' || !isEmail(emailValue)) {
        email.style.borderColor = 'red';
        message.style.borderColor = '#fff'
        error.innerHTML = 'compila campo email';
        error.classList.remove('hide');
    } else if ((emailValue !== '' || isEmail(emailValue)) && msgValue === '') {
        email.style.borderColor = '#fff';
        message.style.borderColor = 'red';
        error.innerHTML = 'compila campo messaggio';
        error.classList.remove('hide');
    } else {
        email.style.borderColor = '#fff';
        message.style.borderColor = '#fff';
        error.innerHTML = 'messaggio inviato';
        error.classList.add('success');
    }
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}