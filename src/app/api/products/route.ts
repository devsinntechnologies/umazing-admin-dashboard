// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "@/src/lib/appsScript";

// ✅ GET — fetch all products
export async function GET() {
  try {
    const data = await fetchProducts();
    return NextResponse.json({ success: true, products: data.products });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// ✅ POST — add / edit / delete product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, product, id, deleteFiles } = body;

    let result;
    if (action === "addProduct") result = await addProduct(product);
    else if (action === "editProduct") result = await editProduct(product);
    else if (action === "deleteProduct") result = await deleteProduct(id, deleteFiles);
    else throw new Error("Unknown action");

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
