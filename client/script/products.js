const productsEl = document.getElementById('products');
const cartBtnEl = document.getElementById('cartBtn');


let cartArr;
let productsArr = [];

// loads previous cart arr
function getCartArr(){
    const temp = localStorage.getItem('cartArr');
    const temp2 = JSON.parse(temp);
    if (temp2 === null || temp2 === undefined) {
        cartArr = [];
        localStorage.setItem('cartArr', JSON.stringify(cartArr));
    } else {
        cartArr = temp2;
    }
}

// loads product data 
const loadProducts = () => {
    const baseUrl = "localhost:3001";
    $.ajax({
        url: `${baseUrl}/products`,
        method: "GET",
        success(res){
            productsArr = res;
            console.log(productsArr)
            displayProductsDOM(res);
        },
        error(err){
            alert('Could not fetch products !!');
        }
    });
};

// renders products list on DOM
function displayProductsDOM(products){
    productsEl.innerHTML = products.map(product=>`
        <div class="product">
            <div class="product-info">
                <img src="${product.url_image}" alt="product-image">
                <h4>${product.name}</h4>
                <h5>Price: $ ${product.price}</h5>
                <h5>Discount: ${product.discount}</h5>
                <h5>Category: ${product.category}</h5>
                <button id="${product.id}" class="addBtn">add to cart</button>
            </div>
        </div>
    `)
    .join('');

    // add to cart button clicked
    $(".addBtn").on('click', addToCart);
}

// checks if item is already present in the cart
function isItemInCart(currId){
    for (const product of cartArr){
        if (currId === product._id){
            product['qty'] += 1;
            return true;
        }
    }
    return false;
}

// add to cart function
function addToCart(e){
    //cartArr.push(this.id);
    const currId = this.id;
    let item = {};

    // check if item is already in cart
    if(!isItemInCart(currId)){
        for(const product of productsArr){
            if (product._id === currId){
                // console.log(cartArr);
                item['name'] = product.name;
                item['price'] = product.price;
                item['img'] = product.url_image;
                item['_id'] = product.id;
                item['qty'] = 1;
                cartArr.push(item);
            }
        }
    }
    alert('Item Added to cart');
}

// display cart
function displayCart(){
    // console.log(cartArr);
    saveCartToLocal();
    window.location.href = "./cart.html";
}

// save user cart to local storage
function saveCartToLocal(){
    localStorage.setItem('cartArr', JSON.stringify(cartArr));
}

cartBtnEl.addEventListener('click', displayCart);

loadProducts();
getCartArr();



