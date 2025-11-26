
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function NewProduct(){
  const [title,setTitle]=useState(''); const [slug,setSlug]=useState(''); const [price,setPrice]=useState(0);
  const [desc,setDesc]=useState(''); const [images,setImages]=useState([]);
  const router = useRouter();

  async function uploadFile(file){
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload/cloudinary', { method:'POST', body: fd });
    const j = await res.json();
    if(j.secure_url) return j.secure_url;
    if(j.url) return j.url;
    return null;
  }

  async function submit(e){
    e.preventDefault();
    const imgs = [];
    const files = document.getElementById('images').files;
    for(let i=0;i<files.length;i++){
      const u = await uploadFile(files[i]);
      if(u) imgs.push(u);
    }
    const payload = { title, slug, price_cents: Math.round(price*100), description: desc, images: imgs };
    const res = await fetch('/api/products/create', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    if(res.ok){ router.push('/admin/products'); } else { alert('خطأ'); }
  }

  return (
    <main dir="rtl" className="container" style={{paddingTop:20}}>
      <h1>اضافة منتج جديد</h1>
      <form onSubmit={submit}>
        <input placeholder="العنوان" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="slug (مثال: product-name)" value={slug} onChange={e=>setSlug(e.target.value)} />
        <input type="number" step="0.01" placeholder="السعر (EGP)" value={price} onChange={e=>setPrice(e.target.value)} />
        <textarea placeholder="الوصف" value={desc} onChange={e=>setDesc(e.target.value)} />
        <input id="images" type="file" multiple />
        <button className="btn primary" type="submit">حفظ</button>
      </form>
    </main>
  );
}
