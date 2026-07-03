import { addToCart, updateCartQuantity } from "../data/cart.js";
import { loadProducts, products } from "../data/products.js";
import { searchbarValue } from "./utils/searchbar.js";

// Enable search bar on every page
searchbarValue();

// Load products, then render them
loadProducts(renderProductsGrid);

function renderProductsGrid() {
  // Get search text from URL
  const url = new URL(window.location.href);
  const search = (url.searchParams.get("search") || "").toLowerCase();

  // Show search text in the input box
  const searchBar = document.querySelector(".js-search-bar");
  if (searchBar) {
    searchBar.value = search;
  }

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (!search) {
      return true;
    }

    const nameMatch = product.name.toLowerCase().includes(search);

    const keywordMatch = product.keywords?.some((keyword) =>
      keyword.toLowerCase().includes(search),
    );

    return nameMatch || keywordMatch;
  });

  let productsHTML = "";

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">

        <div class="product-image-container">
          <img
            class="product-image"
            src="${product.image}"
          >
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img
            class="product-rating-stars"
            src="${product.getStars()}"
          >

          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHtml()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-check-mark-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button
          class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>

      </div>
    `;
  });

  document.querySelector(".js-product-grid").innerHTML = productsHTML;

  updateCartQuantity();

  const timeoutIds = {};

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      const quantity = Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value,
      );

      addToCart(productId, quantity);

      const addedMessage = document.querySelector(
        `.js-check-mark-${productId}`,
      );

      addedMessage.style.opacity = "1";

      clearTimeout(timeoutIds[productId]);

      timeoutIds[productId] = setTimeout(() => {
        addedMessage.style.opacity = "0";
      }, 1500);
    });
  });
}

console.log(
  "apparel",
  "athletic",
  "basketballs",
  "bathroom",
  "footwear",
  "glass",
  "home",
  "hoodie",
  "kitchen",
  "pants",
  "running",
  "shoes",
  "shirts",
  "socks",
  "sports",
  "storage",
);

console.log("These are the categories, search anything you like :)");
