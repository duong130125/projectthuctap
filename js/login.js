const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInButton = document.getElementById('signInButton');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

signInButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    const email = emailInput.value.trim(); 
    const password = passwordInput.value.trim(); 

    // Lấy dữ liệu từ local storage và chuyển đổi thành đối tượng JavaScript
    let storedData = JSON.parse(localStorage.getItem('formDataArray'));

    // Kiểm tra xem dữ liệu từ local storage có tồn tại không
    let user = storedData.find(user => user.email === email && user.password === password);

    if (user) {
        if (user.locked) {
            alert('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để biết thêm chi tiết.');
            return; // Không cho phép đăng nhập nếu tài khoản bị khóa
        } else {
            localStorage.setItem('userClass', user.id);
            document.getElementById('successMessage').style.display = 'block';
            window.location.href = "index.html";
        }
    } else {
        alert('Email hoặc password không chính xác.');
    }
});
