import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, TrendingUp, Package, DollarSign, BarChart3 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function SellerDashboard() {
  const { isAuthenticated } = useAuth();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("CV");
  const [productPrice, setProductPrice] = useState("");
  const [productFileType, setProductFileType] = useState("PDF");

  // Fetch seller dashboard data
  const { data: dashboard, isLoading } = trpc.seller.getDashboard.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Create product mutation
  const createProductMutation = trpc.product.create.useMutation({
    onSuccess: () => {
      setShowUploadForm(false);
      setProductTitle("");
      setProductDescription("");
      setProductPrice("");
      alert("Product created! You can now upload the file.");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle || !productDescription || !productPrice) {
      alert("Please fill in all fields");
      return;
    }
    createProductMutation.mutate({
      title: productTitle,
      description: productDescription,
      category: productCategory,
      price: parseFloat(productPrice),
      fileType: productFileType as "ZIP" | "PDF" | "DOCX" | "PPTX" | "XLSX",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-foreground/70 mb-4">Please sign in to access seller dashboard</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border py-4">
          <div className="container flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-70">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </a>
            </Link>
          </div>
        </header>
        <div className="container py-12">
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (!dashboard || !dashboard.seller) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border py-4">
          <div className="container flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-70">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </a>
            </Link>
          </div>
        </header>
        <div className="container py-12 text-center">
          <p className="text-foreground/70 mb-4">You are not registered as a seller yet.</p>
          <Link href="/seller/register">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { seller, stats } = dashboard;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </a>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Seller Dashboard</h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="container py-12">
        {/* Store Info */}
        <div className="mb-12 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <h2 className="text-3xl font-bold text-foreground mb-2">{seller.storeName}</h2>
          <p className="text-foreground/70 mb-4">{seller.storeDescription}</p>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              seller.status === "approved"
                ? "bg-green-100 text-green-800"
                : seller.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {seller.status === "approved" ? "✓ Approved" : seller.status === "pending" ? "⏳ Pending" : "✗ Rejected"}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground/70 text-sm font-semibold">Total Products</span>
              <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-700" />
              </div>
            </div>
            <p className="text-4xl font-bold text-foreground">{stats.totalProducts}</p>
            <p className="text-xs text-foreground/60 mt-2">{stats.publishedProducts} published</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground/70 text-sm font-semibold">Total Sales</span>
              <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-700" />
              </div>
            </div>
            <p className="text-4xl font-bold text-foreground">{stats.totalSales}</p>
            <p className="text-xs text-foreground/60 mt-2">Completed orders</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground/70 text-sm font-semibold">Total Revenue</span>
              <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-700" />
              </div>
            </div>
            <p className="text-4xl font-bold text-foreground">EGP {Math.round(parseFloat(seller.totalRevenue.toString()))}</p>
            <p className="text-xs text-foreground/60 mt-2">Gross sales</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-foreground/70 text-sm font-semibold">Available Balance</span>
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-700" />
              </div>
            </div>
            <p className="text-4xl font-bold text-foreground">EGP {Math.round(parseFloat(seller.currentBalance.toString()))}</p>
            <p className="text-xs text-foreground/60 mt-2">Ready to withdraw</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Your Products</h2>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              onClick={() => setShowUploadForm(!showUploadForm)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Product
            </Button>
          </div>

          {/* Upload Form */}
          {showUploadForm && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Create New Product</h3>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Title *</label>
                    <input
                      type="text"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      placeholder="e.g., Professional CV Template"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Price (EGP) *</label>
                    <input
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="e.g., 50"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>CV</option>
                      <option>Presentation</option>
                      <option>Spreadsheet</option>
                      <option>Document</option>
                      <option>Report</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">File Type</label>
                    <select
                      value={productFileType}
                      onChange={(e) => setProductFileType(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>PDF</option>
                      <option>DOCX</option>
                      <option>PPTX</option>
                      <option>XLSX</option>
                      <option>ZIP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Description *</label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Describe your template..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={createProductMutation.isPending}
                  >
                    {createProductMutation.isPending ? "Creating..." : "Create Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUploadForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Products List */}
          {dashboard.recentOrders && dashboard.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {dashboard.recentOrders.map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-semibold text-foreground">Order #{order.orderNumber}</p>
                    <p className="text-sm text-foreground/70">EGP {order.grossPrice}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    order.paymentStatus === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-foreground/70">No products yet. Create your first product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
