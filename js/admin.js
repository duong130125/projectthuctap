document.addEventListener("DOMContentLoaded", function() {
    // Gọi hàm để đổ dữ liệu người dùng và sản phẩm
    populateUserData();
    populateProductData();
    populateOrderData();

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

    document.getElementById('orderLink').addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Hiển thị trang quản lý đơn hàng
        showSection('orderSection');
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
        let newProductName = prompt("Cập nhật tên mới cho sản phẩm:", product.name);
        let newProductImage = prompt("Cập nhật link hình ảnh mới cho sản phẩm:", product.image);
        let newProductQuantity = prompt("Cập nhật số lượng sản phẩm:", product.quantity);
        let newProductPrice = prompt("Cập nhật giá mới cho sản phẩm:", product.price);

        if (newProductName && newProductImage && newProductPrice && newProductQuantity) {
            product.name = newProductName;
            product.image = newProductImage;
            product.quantity = newProductQuantity;
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
                <td>${product.quantity}</td>
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

function populateOrderData() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let orderTableBody = document.getElementById('orderTableBody');
    orderTableBody.innerHTML = ''; // Xóa dữ liệu cũ trước khi thêm mới

    orders.forEach(order => {
        let row = `
            <tr>
                <td>${order.id}</td>
                <td>${order.userClass}</td>
                <td>${order.totalCartPrice}</td>
                <td>
                    <button onclick="viewOrderDetails(${order.id})">Xem chi tiết</button>
                    <button onclick="confirmOrder(${order.id})">Xác nhận</button>
                </td>
            </tr>
        `;
        orderTableBody.innerHTML += row;
    });
}

function confirmOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
        // Cập nhật trạng thái của đơn hàng thành đã xác nhận
        orders[orderIndex].status = 'confirmed';
        localStorage.setItem("orders", JSON.stringify(orders));
        alert("Xác nhận đơn hàng.");
    } else {
        alert("Không tìm thấy đơn hàng để xác nhận.");
    }
}

function viewOrderDetails(orderId) {
    // Lấy đơn hàng từ localStorage bằng orderId
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let order = orders.find(order => order.id === orderId);
    
    if (order) {
        // Lấy thông tin về người đặt hàng từ đối tượng order
        let orderData = order.orderData || {};
        
        // Lấy thông tin về giỏ hàng từ đơn hàng
        let cart = order.cart;
        
        // Hiển thị chi tiết đơn hàng và thông tin về người đặt hàng
        let details = `Chi tiết đơn hàng ${order.id}:\n`;
        details += `Tổng giá đơn hàng: ${order.totalCartPrice}\n`;
        details += `Thông tin người đặt hàng:\n`;
        details += `- Họ và tên: ${orderData.fullName}\n`;
        details += `- Địa chỉ: ${orderData.address}\n`;
        details += `- Số điện thoại: ${orderData.phoneNumber}\n`;
        details += `- Phương thức thanh toán: ${orderData.paymentMethod}\n`;
        details += "Chi tiết giỏ hàng:\n";
        
        cart.forEach(item => {
            details += `- ${item.name}: ${item.quantily} x ${item.price}\n`;
        });
        
        alert(details);
    } else {
        alert("Không tìm thấy đơn hàng!");
    }
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
