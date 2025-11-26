
import Head from 'next/head';

export default function ProductPage({ product }){
  if(!product) return <main className="container" dir="rtl"><p>المنتج غير موجود</p></main>;
  return (
    <>
      <Head>
        <title>{product.title} — BeMoStore</title>
        <meta name="description" content={product.description || 'منتج من BeMoStore'} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images?.[0] || '/assets/og-image.jpg'} />
      </Head>
      <main dir="rtl" className="container" style={{paddingTop:20}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
          <div>
            <img src={product.images?.[0]||'/assets/product.jpg'} style={{width:'100%', borderRadius:8}} />
          </div>
          <div>
            <h1>{product.title}</h1>
            <p style={{fontWeight:700}}>{(product.price_cents/100).toFixed(2)} EGP</p>
            <p>{product.description}</p>
            <a className="btn primary" href={`/checkout?product=${product.slug}`}>اشتري الآن</a>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx){
  const slug = ctx.params.slug;
  // fetch from local API
  const base = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`;
  try{
    const res = await fetch(base + '/api/products/list');
    const list = await res.json();
    const product = list.find(p=>p.slug===slug) || null;
    return { props: { product } };
  }catch(e){
    return { props: { product: null } };
  }
}
