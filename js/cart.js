// Hàm tăng số lượng
function increaseQuantity(index) {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
    formDataArray[0].cart[index].quantily++; 
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
    updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
}

// Hàm giảm số lượng
function decreaseQuantity(index) {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
    if(formDataArray[0].cart[index].quantily > 1) { 
        formDataArray[0].cart[index].quantily--; 
        localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
        updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    let check = confirm("Bạn có muốn xóa hay không.");
    if(check){
        let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
        formDataArray[0].cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
        localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
        updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
    }
}

// Hàm cập nhật hiển thị giỏ hàng và lưu thông tin vào localStorage
function updateCartDisplay() {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
    let tbody = document.getElementById("tbody");
    let totalCartPrice = 0; // Khởi tạo biến tổng thành tiền

    // Xóa tất cả các phần tử trong tbody để cập nhật mới
    tbody.innerHTML = "";

    formDataArray[0].cart.forEach((item, index) => {
        let totalPrice = item.price * item.quantily; // Tính tổng số tiền cho mỗi mục
        totalCartPrice += totalPrice; // Cộng vào tổng thành tiền
        item.totalPrice = totalPrice; // Thêm thông tin về thành tiền vào đối tượng sản phẩm
        
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td><img src="${item.image}" alt="${item.name}" style="width: 100px; height:60px; object-fit: cover;"></td>
            <td>${item.price}</td>
            <td>${item.quantily}</td>
            <td>${totalPrice}</td>
            <td>
                <button onclick="increaseQuantity(${index})">Tăng</button>
                <button onclick="decreaseQuantity(${index})">Giảm</button>
                <button onclick="removeItem(${index})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Lưu lại thông tin giỏ hàng mới vào localStorage
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));

    // Hiển thị tổng thành tiền
    let totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td colspan="5"><strong>Tổng đơn hàng:</strong></td>
        <td>${totalCartPrice}</td>
        <td><button onclick="redirectToCheckout()">Thanh Toán</button></td>
    `;
    tbody.appendChild(totalRow);

    // Lưu tổng thành tiền vào localStorage
    formDataArray[0].totalCartPrice = totalCartPrice;
    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
}

document.addEventListener("DOMContentLoaded", function() {
    updateCartDisplay(); // Khi trang được tải, cập nhật hiển thị giỏ hàng
});

// Hàm chuyển hướng đến trang thông tin mua hàng
function redirectToCheckout() {
    // Lấy thông tin giỏ hàng từ local storage
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray"));

    // Kiểm tra nếu giỏ hàng trống
    if (!formDataArray || formDataArray[0].cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
        return; // Không chuyển hướng nếu giỏ hàng trống
    } else {
        // Chuyển hướng đến trang thông tin mua hàng
        window.location.href = "order.html";
    }
}




