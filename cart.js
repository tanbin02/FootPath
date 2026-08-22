// Cart System using localStorage
const CART_KEY = "footerpath_cart";
const ORDERS_KEY = "footerpath_orders"; // backup only

// =============== GOOGLE SHEETS ===============
const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbxZg_Fy6GoV0fdmHByORz_KOPpoxeJINuFL-HrKbR0EidcsB-7boNNSqCldT1gKxJ_O/exec";

async function saveOrderToSheet(order) {
  try {
    const res = await fetch(SHEETS_API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "addOrder",
        order: order
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Sheet save error:", err);
    return { success: false, error: err.message };
  }
}

async function getOrdersFromSheet() {
  try {
    const res = await fetch(SHEETS_API_URL + "?action=getOrders");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Sheet load error:", err);
    return [];
  }
}

async function updateOrderStatusInSheet(id, status) {
  try {
    const res = await fetch(SHEETS_API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "updateStatus",
        id: id,
        status: status
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Status update error:", err);
    return { success: false };
  }
}
// ====================== CLEAN / CLEAR ALL ORDERS ======================
async function clearAllOrders() {
  // এখানে আপনার Google Apps Script-এর Web App URL দিন
  const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  try {
    const response = await fetch(`${SCRIPT_URL}?action=clearOrders`, {
      method: "POST",
      // mode: "no-cors" লাগলে যোগ করবেন (কিছু ক্ষেত্রে দরকার হয়)
    });

    // যদি no-cors ব্যবহার করেন তাহলে response check করা যায় না
    // তাই সাধারণত নিচের লাইনগুলো কমেন্ট করে রাখেন
    // const result = await response.json();
    // if (!result.success) throw new Error(result.message || "Failed to clear");

    return true;
  } catch (error) {
    console.error("Error clearing orders:", error);
    throw error;
  }
}
// =============== CART (localStorage) ===============
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

// =============== ORDERS (Google Sheets primary) ===============
async function getOrders() {
  // Primary: Google Sheet
  const sheetOrders = await getOrdersFromSheet();
  if (sheetOrders.length > 0) return sheetOrders;
  
  // Fallback: localStorage (old orders)
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

async function saveOrder(order) {
  const now = new Date();
  const orderNumber =
    "FEP" +
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(Math.floor(Math.random() * 10000)).padStart(4, "0");

  const fullOrder = {
    id: Date.now().toString() + Math.floor(Math.random() * 1000),
    orderNumber,
    paymentStatus: "PENDING",
    orderStatus: "PENDING",
    ...order,
    createdAt: now.toISOString()
  };

  // Save to Google Sheet
  const result = await saveOrderToSheet(fullOrder);

  // Also keep a local backup (optional)
  try {
    const localOrders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    localOrders.unshift(fullOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(localOrders));
  } catch (e) {}

  if (result && result.success) {
    return fullOrder;
  } else {
    console.warn("Sheet save failed, but order saved locally");
    return fullOrder; // still return so UI can continue
  }
}

async function updateOrderStatus(id, status) {
  await updateOrderStatusInSheet(id, status);

  // Also update local backup if exists
  try {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    const order = orders.find(o => o.id === id);
    if (order) {
      order.orderStatus = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  } catch (e) {}
}

// Download orders as CSV
async function downloadOrdersCSV() {
  const orders = await getOrders();
  if (orders.length === 0) {
    alert("No orders yet");
    return;
  }

  let csv = "Order Number,Date,Customer,Phone,Email,Address,District,Items,Subtotal,Delivery,Total,Payment,Status\n";
  orders.forEach(o => {
    const items = (o.items || [])
      .map(i => (i.productName || i.name || "") + " (" + (i.size || "") + "/" + (i.color || "") + " x" + (i.quantity || 1) + ")")
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
      o.subtotal || 0,
      o.deliveryCharge || 0,
      o.total || 0,
      o.paymentMethod || "",
      o.orderStatus || ""
    ].join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "footerpath-orders.csv";
  link.click();
}

// Init badge
document.addEventListener("DOMContentLoaded", updateCartBadge);
