
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"WebSite",
    "name":"BeMoStore",
    "url":"https://yourdomain.com"
  };

  return (
    <>
      <Head>
        <title>BeMoStore — متجر إلكتروني جاهز لبدء البيع</title>
        <meta name="description" content="صفحة هبوط عالية التحويل لمتجرك الإلكتروني — سرعة، SEO، وتهيئة للنشر على Vercel." />
        <meta name="keywords" content="متجر, ecommerce, بيع, صفحة هبوط, BeMoStore" />
        <meta property="og:title" content="BeMoStore — متجر إلكتروني جاهز" />
        <meta property="og:description" content="صفحة هبوط عالية التحويل لمتجرك الإلكتروني." />
        <meta property="og:image" content="/assets/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/assets/logo.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <main dir="rtl">
        <header className="hero">
          <div className="container">
            <img src="/assets/logo.png" className="logo" alt="BeMoStore Logo" />
            <h1>ابدأ متجرك الإلكتروني اليوم</h1>
            <p className="lead">قالب جاهز للنشر على Vercel — Checkout، SEO، Analytics، وصور عالية الجودة.</p>
            <Link href="/#products"><a className="btn primary">ابدأ الآن</a></Link>
          </div>
        </header>

        <section id="features" className="container features">
          <h2>مميزات القالب</h2>
          <div className="grid">
            <div className="card"><h3>سريع</h3><p>محسن للسرعة وخصوصاً للموبايل.</p></div>
            <div className="card"><h3>سهل التكامل</h3><p>تستطيع ربطه بأي بوابة دفع أو backend.</p></div>
            <div className="card"><h3>SEO جاهز</h3><p>Meta, OG, structured data مُـضمّن.</p></div>
          </div>
        </section>

        <section id="products" className="container products">
          <h2>منتجات مختارة</h2>
          <div className="products-grid">
            <div className="product">
              <img src="/assets/product.jpg" alt="Product" />
              <h3>سماعات لاسلكية</h3>
              <p className="price">EGP 799</p>
              <Link href="/checkout"><a className="btn">اشتري الآن</a></Link>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="container">
            <p>© 2025 BeMoStore</p>
          </div>
        </footer>
      </main>
    </>
  );
}
