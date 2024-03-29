let signUpButton = document.getElementById('signUpButton');
let signupForm = document.getElementById('signupForm');
let successMessage = document.getElementById('successMessage');
let errorMessage = document.getElementById('errorMessage');
let infoMessage = document.getElementById('infoMessage');
let loginLink = document.getElementById('loginLink');

signUpButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!firstName || !lastName || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin");
        return; 
    }

    let formData = {
        id: Math.floor(Math.random()*999999),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        cart:[],
    };

    let formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

    let emailExists = formDataArray.some(data => data.email === email);

    if (emailExists) {
        alert("Email đã tồn tại");
        successMessage.textContent = ""; 
    } else {
        formDataArray.push(formData);
        localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
        signupForm.reset();

        alert("Đăng kí thành công");
        errorMessage.textContent = ""; 

        window.location.href = "./login.html";
    }
});