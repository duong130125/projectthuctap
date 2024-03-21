document.addEventListener("DOMContentLoaded", function() {
    // Lấy dữ liệu từ local storage
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
    console.log("Dữ liệu từ local storage:", formDataArray);
    
    // Kiểm tra xem liệu có dữ liệu trong local storage không
    if(formDataArray && formDataArray[0].cart) {
        console.log("Dữ liệu cart:", formDataArray[0].cart);
        // Lặp qua từng mục trong cart và thêm vào tbody
        let tbody = document.getElementById("tbody");
        let totalCartPrice = 0; // Khởi tạo biến tổng thành tiền
        for(let i = 0; i < formDataArray[0].cart.length; i++) {
            let item = formDataArray[0].cart[i];
            let totalPrice = item.price * item.quantily; // Tính tổng số tiền cho mỗi mục
            totalCartPrice += totalPrice; // Cộng vào tổng thành tiền
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td><img src="${item.image}" alt="${item.name}" style="width: 100px; height:60px; object-fit: cover;"></td>
                <td>${item.price}</td>
                <td>${item.quantily}</td>
                <td>${totalPrice}</td>
                <td>
                    <button onclick="increaseQuantity(${i})">Tăng</button>
                    <button onclick="decreaseQuantity(${i})">Giảm</button>
                    <button onclick="removeItem(${i})">Xóa</button>
                </td>
            `;
            tbody.appendChild(row);
        }
        // Tạo hàng ngang mới để hiển thị tổng đơn hàng
        let totalRow = document.createElement("tr");
        totalRow.innerHTML = `
            <td colspan="5"><strong>Tổng đơn hàng:</strong></td>
            <td>${totalCartPrice}</td>
            <td><button onclick="redirectToCheckout()">Mua</button></td>
        `;
        tbody.appendChild(totalRow);
    } else {
        console.log("Không tìm thấy dữ liệu hoặc cart trong dữ liệu.");
    }
});

// Hàm tăng số lượng
function increaseQuantity(index) {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
    formDataArray[0].cart[index].quantily++; 
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
    location.reload(); // Tải lại trang để cập nhật giỏ hàng
}

// Hàm giảm số lượng
function decreaseQuantity(index) {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
    if(formDataArray[0].cart[index].quantily > 1) { 
        formDataArray[0].cart[index].quantily--; 
        localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
        location.reload(); // Tải lại trang để cập nhật giỏ hàng
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
    formDataArray[0].cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
    location.reload(); // Tải lại trang để cập nhật giỏ hàng
}

// Hàm chuyển hướng đến trang thông tin mua hàng
function redirectToCheckout() {
    window.location.href = "order.html";
}