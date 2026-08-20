// Cart System using localStorage
const CART_KEY = "footerpath_cart";
const ORDERS_KEY = "footerpath_orders";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(item) {
  const cart = getCart();
  const id = item.productId + "-" + item.size + "-" + item.color;
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.quantity = Math.min(existing.quantity + (item.quantity || 1), item.stock || 99);
  } else {
    cart.push({
      id,
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      image: item.image,
      price: item.price,
      discountPrice: item.discountPrice,
      size: item.size,
      color: item.color,
      quantity: item.quantity || 1,
      stock: item.stock || 99
    });
  }
  saveCart(cart);
  return cart;
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  return cart;
}

function updateQuantity(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return cart;
  if (qty < 1) return removeFromCart(id);
  item.quantity = Math.min(qty, item.stock);
  saveCart(cart);
  return cart;
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

function getSubtotal() {
  return getCart().reduce((sum, i) => {
    const price = i.discountPrice != null ? i.discountPrice : i.price;
    return sum + price * i.quantity;
  }, 0);
}

function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-badge");
  const count = getCartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? "flex" : "none";
  });
}

// Orders
function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  const now = new Date();
  const orderNumber =
    "FEP" +
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(Math.floor(Math.random() * 10000)).padStart(4, "0");

  const fullOrder = {
    id: Date.now().toString(),
    orderNumber,
    ...order,
    createdAt: now.toISOString()
  };
  orders.unshift(fullOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return fullOrder;
}

function updateOrderStatus(id, status) {
  const orders = getOrders();
  const order = orders.find(o => o.id === id);
  if (order) {
    order.orderStatus = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}

// Download orders as CSV (Excel can open it)
function downloadOrdersCSV() {
  const orders = getOrders();
  if (orders.length === 0) {
    alert("No orders yet");
    return;
  }

  let csv = "Order Number,Date,Customer,Phone,Email,Address,District,Items,Subtotal,Delivery,Total,Payment,Status\n";

  orders.forEach(o => {
    const items = (o.items || [])
      .map(i => i.productName + " (" + i.size + "/" + i.color + " x" + i.quantity + ")")
      .join("; ");
    csv += [
      o.orderNumber,
      new Date(o.createdAt).toLocaleString(),
      '"' + (o.customerName || "") + '"',
      o.phone || "",
      o.email || "",
      '"' + (o.address || "") + '"',
      o.district || "",
      '"' + items + '"',
      o.subtotal,
      o.deliveryCharge,
      o.total,
      o.paymentMethod,
      o.orderStatus
    ].join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "footerpath-orders.csv";
  link.click();
}

// Init badge on page load
document.addEventListener("DOMContentLoaded", updateCartBadge);
