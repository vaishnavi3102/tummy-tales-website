let quantityBoxes=document.querySelectorAll(".food_quantity")
let cartIcon=document.querySelector(".fa-cart-shopping")
let cartItemsCount=document.getElementById("cart_items")
let cartPrice=document.getElementById("price")
let orderButton=document.getElementById("order")

let cartPopup=document.createElement("div")
document.body.appendChild(cartPopup)
cartPopup.id="cartPopup"
// cartPopup.style.height="150px"
// cartPopup.style.width="200px
// cartPopup.style.border="2px solid red"
cartPopup.style.borderRadius="40px"
cartPopup.style.position="fixed"
cartPopup.style.top="90px"
cartPopup.style.right="40px"
cartPopup.style.backgroundColor="white"
cartPopup.style.padding="15px"
cartPopup.style.display="none"
// cartPopup.style.boxShadow="rgba(62, 114, 173, 0.83) 3px 3px 10px";
// cartPopup.style.backgroundColor="rgba(16, 17, 47, 0.97)"
cartPopup.style.backgroundColor="black"
cartPopup.style.color="white"





cartIcon.addEventListener("click",()=>{
    if(cartPopup.style.display=="none"){
        cartPopup.style.display="block";  
    }else{
        cartPopup.style.display="none";
    }
});

let cart={}

quantityBoxes.forEach((box)=>{
    // console.log(quantityBoxes)
    let icons=box.querySelectorAll("i");
    // console.log(icons)
    let minusBtn=icons[0];
    let plusBtn=icons[1];
    let card=box.closest(".card_container");
    // console.log(card)
    let title=card.querySelector(".food_title").innerText
    // console.log(title)
    let price=parseInt(card.querySelector(".food_price").innerText)
    // console.log(price)



 function updateCart(){
    let totalQty=0;
    let totalPrice=0;
    cartPopup.innerHTML="";
    for(let item in cart){
        let qty=cart[item].quantity
        let itemPrice=cart[item].price
        totalQty +=qty
        totalPrice +=qty*itemPrice
        cartPopup.innerHTML+=`<p>${item} x ${qty} = <i class="fa-solid fa-indian-rupee-sign"></i>${qty*itemPrice.toFixed(2)}</p>`

        // cartPopup.innerHTML=`<p>Total price = ${totalPrice.toFixed(2)}</p>`
    }
    cartItemsCount.innerText=totalQty
    cartPrice.innerHTML=`<i class="fa-solid fa-indian-rupee-sign"></i> ${totalPrice.toFixed(2)}`
 }

 function setQuantity(qty){
    box.innerText="";
    box.append(minusBtn,qty,plusBtn)
}

minusBtn.addEventListener("click",()=>{
    let current=parseInt(box.innerText)
    if(current>0){
        current--
        if(current==0){
            delete cart[title]
        }else{
            cart[title].quantity=current
        }
    }
    updateCart();
    setQuantity(current);
})

plusBtn.addEventListener("click",()=>{
    let current=parseInt(box.innerText)
    current++
    cart[title]={
        quantity:current,
        price:price
    }
    updateCart();
    setQuantity(current);    
})

});

//https://aromas-restaurant.netlify.app/

orderButton.addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty! Add some items to place an order.");
        return;
    }

    let orderSummary = "🧾 Your Order Summary:\n\n";
    let total = 0;

    for (let item in cart) {
        let qty = cart[item].quantity;
        let price = cart[item].price;
        let itemTotal = qty * price;
        total += itemTotal;
        orderSummary += `${item} x ${qty} = ₹${itemTotal.toFixed(2)}\n`;
    }

    orderSummary += `\n💰 Total: ₹${total.toFixed(2)}\n\n✅ Thank you for your order!`;

    // Option 1: Show as alert (basic)
    alert(orderSummary);
    // cartPopup.style.orderSummary="block;"

    // Option 2: Log to console (for debugging)
    console.log(orderSummary);
    

    // Option 3: Replace alert with a modal if desired (optional UI improvement)

    // Clear cart after order
    cart = {};
    updateCart();

    // Reset all quantities shown on cards
    quantityBoxes.forEach((box) => {
        const icons = box.querySelectorAll("i");
        const minusBtn = icons[0];
        const plusBtn = icons[1];
        const qty = 0;
        box.innerText = "";
        box.append(minusBtn, qty, plusBtn);
    });
});

// let modal = document.getElementById("orderModal");
// let closeButton = document.querySelector(".close-button");
// let orderDetails = document.getElementById("orderDetails");
// let totalAmount = document.getElementById("totalAmount");
// let confirmOrder = document.getElementById("confirmOrder");

// orderButton.addEventListener("click", () => {
//     if (Object.keys(cart).length === 0) {
//         alert("Your cart is empty! Add some items to place an order.");
//         return;
//     }

//     // Clear previous content
//     orderDetails.innerHTML = "";
//     let total = 0;

//     for (let item in cart) {
//         let qty = cart[item].quantity;
//         let price = cart[item].price;
//         let itemTotal = qty * price;
//         total += itemTotal;

//         let itemRow = document.createElement("p");
//         itemRow.textContent = `${item} x ${qty} = ₹${itemTotal.toFixed(2)}`;
//         orderDetails.appendChild(itemRow);
//     }

//     totalAmount.textContent = `Total: ₹${total.toFixed(2)}`;

//     // Show modal
//     modal.style.display = "flex";
// });

// // Close modal when "X" is clicked
// closeButton.addEventListener("click", () => {
//     modal.style.display = "none";
// });

// // Close modal when clicking outside content
// window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// });

// // Confirm order
// confirmOrder.addEventListener("click", () => {
//     alert("✅ Your order has been placed successfully!");
//     modal.style.display = "none";
//     cart = {};
//     updateCart();

//     // Reset quantities in cards
//     quantityBoxes.forEach((box) => {
//         const icons = box.querySelectorAll("i");
//         const minusBtn = icons[0];
//         const plusBtn = icons[1];
//         const qty = 0;
//         box.innerText = "";
//         box.append(minusBtn, qty, plusBtn);
//     });
// });
