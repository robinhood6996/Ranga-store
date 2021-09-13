//Fetch data from api and set paramenter result to show data  on site.
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const rating = product.rating.rate;
    const name = product.title.slice(0, 15);

    //UI create and data show in html
    const div = document.createElement("div");
    div.classList.add("col");
    div.style.marginBottom = '10px';
    div.innerHTML = `
         <div class="card p-4">
        <img src="${image}" width="150px" height="250px" class="card-img-top " alt="...">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Category: ${product.category}</p>
             <h5 id="product-price">Price: $ ${product.price}</h5>
              <p>
            <span id="rating" class="fa fa-star"> ${product.rating.rate}</span>
            <span>(${product.rating.count}) </span>
            </p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button type="button" id="details-btn" class="btn btn-danger" onclick="loadSingleProduct(${product.id})">Details</button></div>
        </div>
    </div>
      
      `;

    document.getElementById("all-products").appendChild(div);
  }
};

//add to  card button action here------
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

//get innertext by pass parameter of emelemnt id.
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


//Load single product data by clicking on details button.
const loadSingleProduct = (id) => {
  console.log(id);
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySingleProduct(data));

}


//Display Single product data on site by getting data by api
const displaySingleProduct = (data) => {
  const parentDiv = document.getElementById('unique-product');
  parentDiv.textContent = "";
  console.log(data);
  const div = document.createElement('div');
  div.classList.add('single-product');
  div.innerHTML = `
   <img src="${data.image}" height="350px" alt="">
    <h2 class ="card-title">${data.title}</h2>
    <h3 class ="price" id="product-price">Price: $ <span>${data.price}</span></h3>
    <h5>Category: ${data.category}</h5>
    <p>
    <span id="rating" class="fa fa-star ">${data.rating.rate}</span>
    <span>(${data.rating.count}) </span>
    </p>
    <p class ="details">${data.description}</p>
  `;

  parentDiv.appendChild(div);
}

// Seach Category Products
const categoryProducts = () => {

  const inputField = document.getElementById('search-text');
  const inputValue = inputField.value;
  console.log(inputValue);
  const url = `https://fakestoreapi.com/products/category/${inputValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showCategoryProducts(data));
  inputField.value = "";
  const productDetails = document.getElementById('unique-product');
  productDetails.textContent = "";
}

const showCategoryProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  const parentDiv = document.getElementById("all-products");
  parentDiv.textContent = "";
  for (const product of allProducts) {
    console.log(product)
    const image = product.image;
    const name = product.title.slice(0, 15);

    //UI create and data show in html
    const div = document.createElement("div");
    div.classList.add("col");
    div.style.marginBottom = '10px';
    div.innerHTML = `
         <div class="card p-4">
        <img src="${image}" width="150px" height="250px" class="card-img-top " alt="...">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Category: ${product.category}</p>
             <h5 id="product-price">Price: $ ${product.price}</h5>
              <p>
            <span id="rating" class="fa fa-star"> ${product.rating.rate}</span>
            <span>(${product.rating.count}) </span>
            </p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button type="button" id="details-btn" class="btn btn-danger" onclick="loadSingleProduct(${product.id})">Details</button></div>
        </div>
    </div>
      
      `;

    parentDiv.appendChild(div);
  }
}