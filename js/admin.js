document.addEventListener("DOMContentLoaded", function() {
    // Gọi hàm để đổ dữ liệu người dùng và sản phẩm
    populateUserData();
    populateProductData();

    // Lắng nghe sự kiện khi nhấp vào liên kết "Người dùng"
    document.getElementById('userLink').addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Hiển thị trang quản lý người dùng
        showSection('userSection');
    });

    // Lắng nghe sự kiện khi nhấp vào liên kết "Sản phẩm"
    document.getElementById('productLink').addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Hiển thị trang quản lý sản phẩm
        showSection('productSection');
    });
});

function populateUserData() {
    let userData = JSON.parse(localStorage.getItem("formDataArray"));
    let userTableBody = document.getElementById('userTabletbody');
    userTableBody.innerHTML = ''; // Xóa dữ liệu cũ trước khi thêm mới

    userData.forEach(user => {
        let row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>              
                <td>${user.email}</td>
                <td>
                    <button class="lockBtn">${user.locked ? 'Mở' : 'Khóa'}</button>
                    <button class="deleteBtn">Xóa</button>
                </td>
            </tr>
        `;
        userTableBody.innerHTML += row;
    });

    // Lắng nghe sự kiện khi nhấp vào nút khóa và xóa
    let lockButtons = document.querySelectorAll('.lockBtn');
    let deleteButtons = document.querySelectorAll('.deleteBtn');

    lockButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            toggleLockUser(userData[index].id); // Gọi hàm toggleLockUser() để khóa/mở khóa người dùng
        });
    });

    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            deleteUser(userData[index].id); // Gọi hàm deleteUser() để xóa người dùng
        });
    });
}

function toggleLockUser(userId) {
    let userData = JSON.parse(localStorage.getItem("formDataArray"));
    let updatedUserData = userData.map(user => {
        if (user.id === userId) {
            // Đảo ngược trạng thái khóa của người dùng
            user.locked = !user.locked;
        }
        return user;
    });

    // Cập nhật dữ liệu trong localStorage
    localStorage.setItem("formDataArray", JSON.stringify(updatedUserData));

    // Cập nhật giao diện người dùng
    populateUserData();
}

function deleteUser(userId) {
    let userData = JSON.parse(localStorage.getItem("formDataArray"));
    
    // Lọc ra người dùng có id không trùng với userId được chỉ định để xóa
    let updatedUserData = userData.filter(user => user.id !== userId);

    // Cập nhật dữ liệu trong localStorage
    localStorage.setItem("formDataArray", JSON.stringify(updatedUserData));

    // Cập nhật giao diện người dùng
    populateUserData();
}


function editProduct(productId) {
    let productData = JSON.parse(localStorage.getItem("products"));
    let product = productData.find(product => product.id === productId);

    if (product) {
        let newProductName = prompt("Nhập tên mới cho sản phẩm:", product.name);
        let newProductImage = prompt("Nhập link hình ảnh mới cho sản phẩm:", product.image);
        let newProductPrice = prompt("Nhập giá mới cho sản phẩm:", product.price);

        if (newProductName && newProductImage && newProductPrice) {
            product.name = newProductName;
            product.image = newProductImage;
            product.price = newProductPrice;

            // Cập nhật dữ liệu trong localStorage
            localStorage.setItem("products", JSON.stringify(productData));

            // Cập nhật giao diện người dùng
            populateProductData();
        } else {
            alert("Vui lòng nhập đủ thông tin cho sản phẩm!");
        }
    } else {
        alert("Sản phẩm không tồn tại!");
    }
}

function deleteProduct(productId) {
    let productData = JSON.parse(localStorage.getItem("products"));

    // Lọc ra sản phẩm có id không trùng với productId đã được cung cấp để xóa
    let updatedProductData = productData.filter(product => product.id !== productId);

    // Cập nhật dữ liệu trong localStorage
    localStorage.setItem("products", JSON.stringify(updatedProductData));

    // Cập nhật giao diện người dùng
    populateProductData();
}

// Hàm cập nhật dữ liệu sản phẩm vào giao diện người dùng
function populateProductData() {
    let productData = JSON.parse(localStorage.getItem("products"));
    let productTableBody = document.getElementById('productTabletbody');
    productTableBody.innerHTML = ''; // Xóa dữ liệu cũ trước khi thêm mới

    productData.forEach(product => {
        let row = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td><img src="${product.image}" alt="${product.name}" style="width: 100px; height:60px; object-fit: cover;"></td>
                <td>${product.price}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Sửa</button>
                    <button onclick="deleteProduct(${product.id})">Xóa</button>
                </td>
            </tr>
        `;
        productTableBody.innerHTML += row;
    });
}


function showSection(sectionId) {
    // Ẩn tất cả các phần nội dung
    let contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = 'none';
    });

    // Hiển thị phần nội dung có id tương ứng
    document.getElementById(sectionId).style.display = 'block';
}
