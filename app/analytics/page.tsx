import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track your store's performance and growth</p>
          </div>

          {/* Revenue Chart */}
          <Card className="border-border/50 bg-card/50 backdrop-blur mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-border rounded-lg bg-background/50">
                <p className="text-muted-foreground">Revenue chart visualization</p>
              </div>
            </CardContent>
          </Card>

          {/* Sales Metrics */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Sales Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">This Week</p>
                        <p className="text-sm text-muted-foreground">234 sales</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-green-500">+12%</p>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">This Month</p>
                        <p className="text-sm text-muted-foreground">892 sales</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-primary">+8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Top Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Electronics", "Accessories", "Clothing", "Home"].map((category, index) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <p className="font-medium">{category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${(5000 - index * 1000).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{150 - index * 30} sales</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
