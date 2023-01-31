
window.onload = () => {
    if(sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            location.replace('/');
        }
    }
}

const loader = document.querySelector('.loader');

const formbtn = document.querySelector('.form-button');
const name = document.querySelector('#username') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;

formbtn.addEventListener('click', () => {
    if(name != null) {
        //register
        if (name.value.length < 3) {
        showAlert('name must be 3 letters long')
        }
        else if (!email.value.length){
            showAlert('enter your email');
        }
        else if (password.value.length < 8){
            showAlert('password should be 8 letters long');
        }
        else if (!number.value.length){
            showAlert('enter your phone number');
        }
        else if (!Number(number.value) || number.value.length < 10){
            showAlert('invalid number, please enter valid one');
        }
        else {
            loader.style.display = 'block';
            sendData('/signup', {
                name: name.value,
                email: email.value,
                password: password.value,
                number: number.value,
                seller:false,
            })
        }
    } else {
        //login 
        if(!email.value.length ||!password.value.length){
            showAlert('fill all the inputs');
        } else {
            loader.style.display = 'block'
            sendData('/login', {
                email: email.value,
                password: password.value,
            })
        }
    }
})

