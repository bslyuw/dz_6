const baseUrl = 'https://geektech-project.herokuapp.com'

const endpoints = {
    products: `${baseUrl}/products/`,
}

//GET request (Products - all)
const state = {
    products: null
}

    function editProduct(id){
        const obj = {
            title: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            stock_price: document.getElementById('stock_price').value,
            category_id: document.getElementById('category_id').value,
            image: null
        }
            fetch(`${endpoints.products}${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        }).then(res => {
                console.log(res.status, res.statusText)
            })
}



function deleteProduct(id) {
    fetch(`https://geektech-project.herokuapp.com/products/${id}`, {
        method: 'DELETE',
    });
}


function getAllProducts() {
    const products = document.querySelector('.products');
    fetch(endpoints.products, {
        method: 'GET'
    }).then((res) => {
       return  res.json();
    }).then((data) => {
        state.products = data;

        for (let i = 0; i < data.length; i++) {
            products.innerHTML += `
            <div class="product_block">
                <img src="${baseUrl}${data[i].image}" alt=""/>
                <h3>${data[i].title}</h3>
                <p class="description">${data[i].description}</p>
                <p class="price">${data[i].price}</p>
                <button id="delete" onclick="deleteProduct(${data[i].id})">Remove</button>
                <button id="edit" onclick="editProduct(${data[i].id})">Edit</button>
                </div>`;
        }

        return data;
    })
}

getAllProducts()

const submit = document.getElementById('submit');


function addProduct() {
    const obj = {
        title: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        stock_price: document.getElementById('stock_price').value,
        category_id: document.getElementById('category_id').value,
        image: null
    }
    fetch(endpoints.products, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => {
        console.log(res.status, res.statusText)
    })
}

submit.addEventListener('click', addProduct)