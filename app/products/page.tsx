"use client"

import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { useState } from "react"
import { AddProductDialog } from "@/components/add-product-dialog"

// Mock data
const initialProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$299.00", stock: 45, status: "active" },
  { id: 2, name: "Smart Watch", category: "Electronics", price: "$399.00", stock: 23, status: "active" },
  { id: 3, name: "Laptop Stand", category: "Accessories", price: "$79.00", stock: 67, status: "active" },
  { id: 4, name: "USB-C Hub", category: "Accessories", price: "$49.00", stock: 12, status: "low stock" },
  { id: 5, name: "Mechanical Keyboard", category: "Electronics", price: "$159.00", stock: 34, status: "active" },
  { id: 6, name: "Wireless Mouse", category: "Electronics", price: "$69.00", stock: 0, status: "out of stock" },
  { id: 7, name: "Monitor Arm", category: "Accessories", price: "$129.00", stock: 18, status: "active" },
  { id: 8, name: "Desk Mat", category: "Accessories", price: "$39.00", stock: 89, status: "active" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
              <p className="text-muted-foreground">Manage your product inventory and pricing</p>
            </div>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Products</p>
                <p className="text-3xl font-bold text-card-foreground">{products.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Active</p>
                <p className="text-3xl font-bold text-green-500">
                  {products.filter((p) => p.status === "active").length}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Low Stock</p>
                <p className="text-3xl font-bold text-yellow-500">
                  {products.filter((p) => p.status === "low stock").length}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Out of Stock</p>
                <p className="text-3xl font-bold text-red-500">
                  {products.filter((p) => p.status === "out of stock").length}
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
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="font-semibold">{product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.status === "active"
                                ? "default"
                                : product.status === "low stock"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              product.status === "active"
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                : product.status === "low stock"
                                  ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                                  : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            }
                          >
                            {product.status}
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
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Product
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
        </div>
      </main>

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddProduct={(product) => {
          setProducts([...products, { ...product, id: products.length + 1 }])
        }}
      />
    </div>
  )
}
