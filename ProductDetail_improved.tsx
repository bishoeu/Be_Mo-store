import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star, Download, AlertCircle, Heart, Share2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id) : null;
  const { isAuthenticated } = useAuth();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product details
  const { data: product, isLoading: productLoading } = trpc.product.getById.useQuery(
    { productId: productId! },
    { enabled: !!productId }
  );

  // Fetch reviews
  const { data: reviews = [] } = trpc.review.getByProductId.useQuery(
    { productId: productId! },
    { enabled: !!productId }
  );

  // Create order mutation
  const createOrderMutation = trpc.order.create.useMutation({
    onSuccess: (data) => {
      if (data.order) {
        window.location.href = `/checkout/${data.order.id}`;
      }
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
      setIsCreatingOrder(false);
    },
  });

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to purchase");
      return;
    }

    if (!productId) return;

    setIsCreatingOrder(true);
    createOrderMutation.mutate({ productId });
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border py-4">
          <div className="container flex items-center gap-4">
            <Link href="/store">
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

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border py-4">
          <div className="container flex items-center gap-4">
            <Link href="/store">
              <a className="flex items-center gap-2 hover:opacity-70">
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </a>
            </Link>
          </div>
        </header>
        <div className="container py-12 text-center">
          <p className="text-foreground/70">Product not found</p>
        </div>
      </div>
    );
  }

  const averageRating = Math.round(parseFloat(product.averageRating.toString()));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/store">
            <a className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Store</span>
            </a>
          </Link>
        </div>
      </header>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-primary/30 via-primary/10 to-accent/20 rounded-xl p-8 h-80 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary/60 mb-4">
                  {product.fileType}
                </div>
                <p className="text-foreground/60 font-medium">{product.fileType} Template</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.title}</h1>

            {/* Rating and Stats */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < averageRating
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-foreground font-medium">
                {product.averageRating.toFixed(1)} ({product.totalReviews} reviews)
              </span>
              <span className="text-foreground/70">
                {product.totalSales} sales
              </span>
            </div>

            {/* Price Section */}
            <div className="mb-8">
              <div className="text-5xl font-bold text-primary mb-2">
                EGP {product.price}
              </div>
              <p className="text-foreground/70 text-lg">One-time purchase • Lifetime access</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">About This Template</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* File Info */}
            <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-4">
                <Download className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-2">File Information</p>
                  <div className="space-y-1 text-foreground/70">
                    <p>Format: <span className="font-medium text-foreground">{product.fileType}</span></p>
                    <p>Size: <span className="font-medium text-foreground">{(product.fileSize / 1024 / 1024).toFixed(2)} MB</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all text-lg py-6"
                onClick={handlePurchase}
                disabled={isCreatingOrder || createOrderMutation.isPending}
              >
                {isCreatingOrder || createOrderMutation.isPending ? "Processing..." : "Buy Now"}
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current text-accent" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800">
                  Please sign in to purchase this template.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Customer Reviews</h2>

          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-foreground/70">No reviews yet. Be the first to review this template!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      {review.title && (
                        <h4 className="font-semibold text-foreground text-lg">{review.title}</h4>
                      )}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-foreground/80 leading-relaxed">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
