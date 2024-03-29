let loginForm = document.getElementById('loginForm');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let signInButton = document.getElementById('signInButton');
let successMessage = document.getElementById('successMessage');
let errorMessage = document.getElementById('errorMessage');

// Tạo một đối tượng tài khoản admin
let adminUser = {
    id: 'admin',
    email: 'admin@.com',
    password: 'admin',
    locked: false // Mặc định tài khoản admin không bị khóa
};

// Lưu thông tin tài khoản admin vào local storage với tên riêng biệt
localStorage.setItem('adminUser', JSON.stringify(adminUser));


signInButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    let email = emailInput.value.trim(); 
    let password = passwordInput.value.trim(); 

    // Lấy dữ liệu từ local storage và chuyển đổi thành đối tượng JavaScript
    let storedAdmin = JSON.parse(localStorage.getItem('adminUser'));

    if (storedAdmin && storedAdmin.email === email && storedAdmin.password === password) {
        localStorage.setItem('userClass', storedAdmin.id);
        document.getElementById('successMessage').style.display = 'block';
        alert('Đăng nhập thành công với quyền admin.');
        window.location.href = "admin.html";
    } else {
        // Nếu không phải là admin, bạn có thể tiếp tục kiểm tra thông tin người dùng thông thường
        let storedData = JSON.parse(localStorage.getItem('formDataArray'));
        let user = storedData.find(user => user.email === email && user.password === password);

        if (user) {
            if (user.locked) {
                alert('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để biết thêm chi tiết.');
                return; // Không cho phép đăng nhập nếu tài khoản bị khóa
            } else {
                localStorage.setItem('userClass', user.id);
                document.getElementById('successMessage').style.display = 'block';
                alert('Đăng nhập thành công.');
                window.location.href = "index.html";
            }
        } else {
            alert('Email hoặc password không chính xác.');
        }
    }
});
