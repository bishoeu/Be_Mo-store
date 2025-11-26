
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export default function EditProduct(){
  const router = useRouter(); const { slug } = router.query;
  const [product, setProduct] = useState(null);
  useEffect(()=>{ if(slug){ fetch('/api/products/list').then(r=>r.json()).then(list=>{ const p=list.find(x=>x.slug===slug); setProduct(p || null); }); } },[slug]);

  async function uploadFile(file){
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload/cloudinary', { method:'POST', body: fd });
    const j = await res.json();
    if(j.secure_url) return j.secure_url;
    if(j.url) return j.url;
    return null;
  }

  async function save(e){
    e.preventDefault();
    const files = document.getElementById('images')?.files || [];
    const imgs = product.images || [];
    for(let i=0;i<files.length;i++){
      const u = await uploadFile(files[i]);
      if(u) imgs.push(u);
    }
    const payload = { id: product._id, title: product.title, slug: product.slug, price_cents: product.price_cents, description: product.description, images: imgs };
    const res = await fetch('/api/products/update', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    if(res.ok) router.push('/admin/products'); else alert('فشل الحفظ');
  }

  if(!product) return <main dir="rtl" className="container"><p>جارٍ التحميل...</p></main>;

  return (
    <main dir="rtl" className="container" style={{paddingTop:20}}>
      <h1>تعديل المنتج</h1>
      <form onSubmit={save}>
        <input value={product.title} onChange={e=>setProduct({...product, title:e.target.value})} />
        <input value={product.slug} onChange={e=>setProduct({...product, slug:e.target.value})} />
        <input type="number" step="0.01" value={(product.price_cents/100).toFixed(2)} onChange={e=>setProduct({...product, price_cents: Math.round(parseFloat(e.target.value)*100)})} />
        <textarea value={product.description} onChange={e=>setProduct({...product, description:e.target.value})} />
        <input id="images" type="file" multiple />
        <button className="btn primary" type="submit">حفظ</button>
      </form>
    </main>
  );
}
