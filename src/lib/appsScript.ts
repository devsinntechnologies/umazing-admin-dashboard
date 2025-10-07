// src/lib/appsScript.ts
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwXMHIUD4O4vMTkLjJYfSYKANKZeR0xZj3lL9aF2_wdEMZjTiDARmn-kiG6VGc4uWa/exec";
export const API_KEY = "uMaziNG-4In1-sTore";

async function handleResponse(res: Response) {
  if (!res.ok) throw new Error("Apps Script request failed");
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Apps Script error");
  return data;
}

/* ------------------------- PRODUCT HELPERS ------------------------- */

// ✅ Fetch all products
export async function fetchProducts() {
  const url = `${APPS_SCRIPT_URL}?action=getProducts&api_key=${API_KEY}`;
  const res = await fetch(url, { cache: "no-store" });
  return handleResponse(res);
}

// ✅ Add a new product
export async function addProduct(product: any) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: API_KEY,
      action: "addProduct",
      product,
    }),
  });
  return handleResponse(res);
}

// ✅ Edit existing product
export async function editProduct(product: any) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: API_KEY,
      action: "editProduct",
      product,
    }),
  });
  return handleResponse(res);
}

// ✅ Delete product
export async function deleteProduct(id: string, deleteFiles = false) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: API_KEY,
      action: "deleteProduct",
      id,
      deleteFiles,
    }),
  });
  return handleResponse(res);
}
