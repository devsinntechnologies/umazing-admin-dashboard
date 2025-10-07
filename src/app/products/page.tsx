"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/src/components/sidebar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  RefreshCcw,
} from "lucide-react";
import { AddProductDialog } from "@/src/components/add-product-dialog";
import { fetchProducts, addProduct, deleteProduct } from "@/src/lib/appsScript";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Fetch products from Apps Script
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add product handler
  const handleAddProduct = async (product: any) => {
    try {
      const newProduct = await addProduct(product);
      setProducts((prev) => [...prev, newProduct]);
    } catch (err: any) {
      alert(err.message || "Failed to add product");
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    }
  };

  // Search filter
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
              <p className="text-muted-foreground">
                Manage your product inventory and pricing
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={loadProducts}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Loading / Error */}
          {loading && (
            <p className="text-center text-muted-foreground py-8">
              Loading products...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 py-8">{error}</p>
          )}

          {!loading && !error && (
            <>
              {/* Stats */}
              <div className="grid gap-6 md:grid-cols-4 mb-8">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Total Products
                    </p>
                    <p className="text-3xl font-bold text-card-foreground">
                      {products.length}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Active
                    </p>
                    <p className="text-3xl font-bold text-green-500">
                      {products.filter((p) => p.inStock).length}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Featured
                    </p>
                    <p className="text-3xl font-bold text-blue-500">
                      {products.filter((p) => p.featured).length}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Out of Stock
                    </p>
                    <p className="text-3xl font-bold text-red-500">
                      {products.filter((p) => !p.inStock).length}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Products Table */}
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  {/* Search */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-background border-border"
                      />
                    </div>
                  </div>

                  {/* Table */}
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Unit Qty</TableHead>
                          <TableHead>In Stock</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">
                              {product.name}
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="font-semibold">
                              ${product.price}
                            </TableCell>
                            <TableCell>{product.unit_quantity || "-"}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  product.inStock
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-red-500/10 text-red-500"
                                }
                              >
                                {product.inStock ? "Yes" : "No"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  product.featured
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-muted-foreground/10 text-muted-foreground"
                                }
                              >
                                {product.featured ? "Yes" : "No"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
