"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Eye, Download, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

// Mock data
const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Wireless Headphones",
    amount: "$299.00",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Smart Watch",
    amount: "$399.00",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Laptop Stand",
    amount: "$79.00",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "#ORD-004",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    product: "USB-C Hub",
    amount: "$49.00",
    status: "processing",
    date: "2024-01-13",
  },
  {
    id: "#ORD-005",
    customer: "Tom Brown",
    email: "tom@example.com",
    product: "Mechanical Keyboard",
    amount: "$159.00",
    status: "completed",
    date: "2024-01-13",
  },
  {
    id: "#ORD-006",
    customer: "Emily Davis",
    email: "emily@example.com",
    product: "Wireless Mouse",
    amount: "$69.00",
    status: "cancelled",
    date: "2024-01-12",
  },
  {
    id: "#ORD-007",
    customer: "David Wilson",
    email: "david@example.com",
    product: "Monitor Arm",
    amount: "$129.00",
    status: "processing",
    date: "2024-01-12",
  },
  {
    id: "#ORD-008",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    product: "Desk Mat",
    amount: "$39.00",
    status: "completed",
    date: "2024-01-11",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "processing":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return ""
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
            <p className="text-muted-foreground">View and manage all customer orders</p>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-card-foreground">{orders.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Completed</p>
                <p className="text-3xl font-bold text-green-500">
                  {orders.filter((o) => o.status === "completed").length}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Processing</p>
                <p className="text-3xl font-bold text-blue-500">
                  {orders.filter((o) => o.status === "processing").length}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-500">
                  {orders.filter((o) => o.status === "pending").length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              {/* Search */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-background border-border"
                  />
                </div>
                <Button variant="outline" className="border-border bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              {/* Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="font-semibold">{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
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
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Order
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
    </div>
  )
}
