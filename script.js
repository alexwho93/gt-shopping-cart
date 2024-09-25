const products = document.querySelector("#products");
const addForm = document.querySelector("#add-form");
const totalQuantity = document.querySelector("#total-quantity");

const productList = [];
let htmlString = "";

window.addEventListener("load", handleLoad);
addForm.addEventListener("submit", handleSubmit);
products.addEventListener("click", handleClick);

function handleLoad() {
  const getLocalStorage = JSON.parse(localStorage.getItem("shopingCart"));
  if (getLocalStorage.length) {
    productList.push(...getLocalStorage);
    updateList();
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const productName = addForm.elements["product-name"].value;
  const productQuantity = addForm.elements["product-quantity"].value;

  // Validare
  if (!/^[a-zA-Z]+$/.test(productName)) {
    document.querySelector("#wrong-name").classList.remove("hidden");
    addForm.reset();
    return;
  }
  if (productQuantity <= 0) {
    document.querySelector("#wrong-name").classList.remove("hidden");
    addForm.reset();
    return;
  }
  document.querySelector("#wrong-name").classList.add("hidden");
  // ********

  productList.push({
    productName: productName,
    productQuantity: productQuantity,
  });

  updateList();
  addForm.reset();
}

function handleClick(event) {
  const incrementButton = event.target.dataset.button === "increment";
  const decrementButton = event.target.dataset.button === "decrement";
  const deleteButton = event.target.dataset.button === "delete";

  const deleteIndex = productList.findIndex(
    (el) => el.productName === event.target.parentNode.id
  );

  const changeQtyIndex = productList.findIndex(
    (el) => el.productName === event.target.parentNode.parentNode.id
  );

  if (incrementButton) {
    if (productList[changeQtyIndex].productQuantity < 99) {
      productList[changeQtyIndex].productQuantity++;
    }
  } else if (decrementButton) {
    if (productList[changeQtyIndex].productQuantity > 1) {
      productList[changeQtyIndex].productQuantity--;
    }
  } else if (deleteButton) {
    productList.splice(deleteIndex, 1);
  }
  updateList();
}

function updateList() {
  htmlString = "";
  productList.forEach(({ productName, productQuantity }) => {
    htmlString += `<div id="${productName}" class="product flex justify-between items-center p-4 text-gray-700 border-b border-gray-400">
  <div class="text-xl font-medium">
    ${productName}
  </div>
  <div class="bg-gray-200 p-1 rounded">
    <button data-button="decrement" class="border-r-2 border-gray-400 px-2 font-semibold text-lg text-cyan-700 hover:opacity-75">-</button>
    <span class="product-quantity px-2 text-center font-semibold text-lg "
      >${String(productQuantity)}</span
    >
    <button data-button="increment" class="border-l-2 border-gray-400 px-2 font-semibold text-lg text-cyan-700 hover:opacity-75">+</button>
  </div>
  <button data-button="delete" class="font-medium text-2xl hover:text-orange-600">x</button>
</div>
`;
  });

  totalQuantity.textContent = productList.length;
  products.innerHTML = htmlString;

  // Update local storage
  localStorage.setItem("shopingCart", JSON.stringify(productList));
}
