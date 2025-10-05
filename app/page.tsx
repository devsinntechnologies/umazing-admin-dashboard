import { Sidebar } from "@/components/sidebar"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data
const recentOrders = [
  { id: "#ORD-001", customer: "John Doe", product: "Wireless Headphones", amount: "$299.00", status: "completed" },
  { id: "#ORD-002", customer: "Jane Smith", product: "Smart Watch", amount: "$399.00", status: "pending" },
  { id: "#ORD-003", customer: "Mike Johnson", product: "Laptop Stand", amount: "$79.00", status: "completed" },
  { id: "#ORD-004", customer: "Sarah Williams", product: "USB-C Hub", amount: "$49.00", status: "processing" },
  { id: "#ORD-005", customer: "Tom Brown", product: "Mechanical Keyboard", amount: "$159.00", status: "completed" },
]

const topProducts = [
  { name: "Wireless Headphones", sales: 234, revenue: "$69,966" },
  { name: "Smart Watch", sales: 189, revenue: "$75,411" },
  { name: "Laptop Stand", sales: 156, revenue: "$12,324" },
  { name: "USB-C Hub", sales: 143, revenue: "$7,007" },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total Revenue"
              value="$45,231"
              change="+20.1% from last month"
              changeType="positive"
              icon={DollarSign}
            />
            <StatCard
              title="Total Sales"
              value="1,234"
              change="+15.3% from last month"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Total Orders"
              value="892"
              change="+12.5% from last month"
              changeType="positive"
              icon={ShoppingCart}
            />
            <StatCard title="Products" value="156" change="+4 new this week" changeType="neutral" icon={Package} />
          </div>

          {/* Charts and Tables */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Recent Orders */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              order.status === "completed" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{order.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Top Products</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-card-foreground">{product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button className="h-auto flex-col gap-2 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Package className="h-6 w-6" />
                  <span className="font-semibold">Add New Product</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col gap-2 py-6 border-border hover:bg-accent bg-transparent"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="font-semibold">View All Orders</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col gap-2 py-6 border-border hover:bg-accent bg-transparent"
                >
                  <TrendingUp className="h-6 w-6" />
                  <span className="font-semibold">View Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
