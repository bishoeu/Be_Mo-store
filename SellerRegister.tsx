import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function SellerRegister() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const registerMutation = trpc.seller.register.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = "/seller/dashboard";
      }, 2000);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) {
      alert("Please enter a store name");
      return;
    }
    registerMutation.mutate({
      storeName,
      storeDescription,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-foreground/70 mb-4">Please sign in to become a seller</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h1>
          <p className="text-foreground/70 mb-6">
            Your seller application has been submitted. Our team will review it and get back to you soon.
          </p>
          <p className="text-sm text-foreground/60">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-4">
        <div className="container flex items-center gap-4">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </a>
          </Link>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Become a Seller</h1>
            <p className="text-foreground/70">
              Start selling your templates and reach thousands of customers.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Store Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Store Name *
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g., Premium Templates Co."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-xs text-foreground/60 mt-1">
                  This is the name customers will see
                </p>
              </div>

              {/* Store Description */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Store Description
                </label>
                <textarea
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Tell us about your store and what templates you offer..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <p className="text-xs text-foreground/60 mt-1">
                  Help customers understand what you offer
                </p>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-foreground/80">
                  <strong>Next Steps:</strong> After submission, our team will review your application. Once approved, you can start uploading templates and earning commissions.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>

          {/* Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-accent">80%</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Keep 80%</h3>
              <p className="text-sm text-foreground/70">
                Earn 80% of every sale. We take 20% commission.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-accent">🚀</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy Upload</h3>
              <p className="text-sm text-foreground/70">
                Upload templates in seconds. Automatic downloads for customers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-accent">💰</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Weekly Payouts</h3>
              <p className="text-sm text-foreground/70">
                Request payouts weekly. Minimum EGP 500.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
