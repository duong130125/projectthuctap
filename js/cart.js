// Hàm tăng số lượng
function increaseQuantity(index) {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];
    let userClass = JSON.parse(localStorage.getItem("userClass"));
    
    for (let i = 0; i < formDataArray.length; i++) {
        if (formDataArray[i].id === userClass) {
            formDataArray[i].cart[index].quantily++; 
            localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
            updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
            break; // Kết thúc vòng lặp sau khi tăng số lượng
        }
    }
}

// Hàm giảm số lượng
function decreaseQuantity(index) {
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];
    let userClass = JSON.parse(localStorage.getItem("userClass"));
    
    for (let i = 0; i < formDataArray.length; i++) {
        if (formDataArray[i].id === userClass) {
            if(formDataArray[i].cart[index].quantily > 1) { 
                formDataArray[i].cart[index].quantily--; 
                localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
                updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
            }
            break; // Kết thúc vòng lặp sau khi giảm số lượng
        }
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    let check = confirm("Bạn có muốn xóa hay không.");
    if(check){
        let formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];
        let userClass = JSON.parse(localStorage.getItem("userClass"));
        
        for (let i = 0; i < formDataArray.length; i++) {
            if (formDataArray[i].id === userClass) {
                formDataArray[i].cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
                localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
                updateCartDisplay(); // Cập nhật hiển thị giỏ hàng
                break; // Kết thúc vòng lặp sau khi xóa sản phẩm
            }
        }
    }
}

// Hàm cập nhật hiển thị giỏ hàng và chuyển hướng đến trang thanh toán
function updateCartDisplay() {
    let userClass = JSON.parse(localStorage.getItem("userClass"));
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];
    let tbody = document.getElementById("tbody");
    let totalCartPrice = 0;
    
    // Xóa tất cả các phần tử trong tbody để cập nhật mới
    tbody.innerHTML = "";

    // Kiểm tra xem người dùng có đăng nhập không
    if (userClass !== null) {
        for (let i = 0; i < formDataArray.length; i++) {
            if (formDataArray[i].id == userClass) {
                let user = formDataArray[i];
                user.cart.forEach((item, index) => {
                    let totalPrice = item.price * item.quantily; 
                    totalCartPrice += totalPrice; 

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
                break; // Kết thúc vòng lặp sau khi tìm thấy người dùng đăng nhập
            }
        }
    }

    // Hiển thị tổng thành tiền
    let totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td colspan="5"><strong>Tổng đơn hàng:</strong></td>
        <td>${totalCartPrice}</td>
        <td><button onclick="redirectToCheckout()">Thanh Toán</button></td>
    `;
    tbody.appendChild(totalRow);

    // Lưu tổng thành tiền vào localStorage
    for (let i = 0; i < formDataArray.length; i++) {
        if (formDataArray[i].id === userClass) {
            formDataArray[i].totalCartPrice = totalCartPrice;
            localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
            break; // Kết thúc vòng lặp sau khi lưu tổng thành tiền
        }
    }
}
updateCartDisplay();

// Hàm chuyển hướng đến trang thông tin mua hàng và lưu dữ liệu giỏ hàng vào local storage
function redirectToCheckout() {
    // Lấy thông tin giỏ hàng từ local storage
    let formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];
    let userClass = JSON.parse(localStorage.getItem("userClass"));

    // Kiểm tra nếu giỏ hàng trống
    if (userClass !== null) {
        for (let i = 0; i < formDataArray.length; i++) {
            if (formDataArray[i].id === userClass) {
                if (!formDataArray[i].cart || formDataArray[i].cart.length === 0) {
                    alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
                    return; // Không chuyển hướng nếu giỏ hàng trống
                } else {
                    // Tạo đối tượng đơn hàng
                    let order = {
                        userClass: userClass,
                        cart: formDataArray[i].cart,
                        totalCartPrice: formDataArray[i].totalCartPrice
                    };

                    // Lưu đối tượng đơn hàng vào local storage
                    localStorage.setItem("order", JSON.stringify(order));

                    // Chuyển hướng đến trang thông tin mua hàng
                    window.location.href = "order.html";
                }
            }
        }
    } else {
        alert("Vui lòng đăng nhập trước khi thanh toán.");
    }
}

