
import { useState, useEffect } from 'react';

function formatDate(d){ return new Date(d).toLocaleString(); }

export default function Admin() {
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState([]);
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('admin_auth');
    if (token === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setAuthed(true);
      fetchOrders();
      fetchProducts();
    }
  }, []);

  async function login(e){
    e.preventDefault();
    if(pass === process.env.NEXT_PUBLIC_ADMIN_PASS){
      sessionStorage.setItem('admin_auth', pass);
      setAuthed(true);
      fetchOrders();
      fetchProducts();
    } else alert('كلمة مرور خاطئة');
  }

  async function fetchOrders(){
    const res = await fetch('/api/orders/list');
    const data = await res.json();
    setOrders(data);
  }

  async function fetchProducts(){
    const res = await fetch('/api/products/list');
    const data = await res.json();
    setProducts(data);
  }

  async function updateStatus(id, status){
    if(!confirm('تأكيد تغيير الحالة إلى ' + status)) return;
    const res = await fetch('/api/orders/update-status', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, status }) });
    if(res.ok) { alert('تم التحديث'); fetchOrders(); }
    else { alert('فشل التحديث'); }
  }

  const filtered = orders.filter(o=>{
    if(statusFilter && o.status !== statusFilter) return false;
    if(!q) return true;
    return (o.merchant_order_id||'').includes(q) || (o.paymob_order_id||'').includes(q) || (o.billing_data?.phone||'').includes(q) || (o.billing_data?.name||'').includes(q);
  });

  if(!authed) return (
    <main dir="rtl" className="container" style={{paddingTop:40}}>
      <h1>تسجيل دخول المدير</h1>
      <form onSubmit={login}>
        <input placeholder="كلمة المرور" value={pass} onChange={e=>setPass(e.target.value)} />
        <button type="submit" className="btn primary">دخول</button>
      </form>
    </main>
  );

  return (
    <main dir="rtl" className="container" style={{paddingTop:20}}>
      <h1>لوحة المدير — الطلبات</h1>
      <div style={{display:'flex', gap:12, alignItems:'center', marginTop:12}}>
        <input placeholder="بحث بالاسم/رقم/هاتف" value={q} onChange={e=>setQ(e.target.value)} />
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="">كل الحالات</option>
          <option value="pending">Pending</option>
          <option value="created">Created</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
        <button className="btn" onClick={fetchOrders}>تحديث</button>
        <a className="btn" href="/admin/products">ادارة المنتجات</a>
      </div>

      <table style={{width:'100%', marginTop:12, borderCollapse:'collapse'}}>
        <thead><tr><th>#</th><th>merchant_id</th><th>paymob_id</th><th>amount</th><th>method</th><th>status</th><th>created</th><th>actions</th></tr></thead>
        <tbody>
          {filtered.map((o, i) => (
            <tr key={o._id} style={{borderTop:'1px solid #eee'}}>
              <td>{i+1}</td>
              <td>{o.merchant_order_id}</td>
              <td>{o.paymob_order_id}</td>
              <td>{(o.amount_cents/100).toFixed(2)} {o.currency}</td>
              <td>{o.payment_method||'—'}</td>
              <td>{o.status}</td>
              <td>{formatDate(o.createdAt)}</td>
              <td>
                <button className="btn" onClick={()=>updateStatus(o._id,'paid')}>وضع مدفوع</button>
                <button className="btn" onClick={()=>updateStatus(o._id,'failed')}>فشل</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <section style={{marginTop:30}}>
        <h2>المنتجات</h2>
        <a className="btn primary" href="/admin/products/new">اضافة منتج جديد</a>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginTop:12}}>
          {products.map(p=>(
            <div key={p._id} style={{background:'#fff', padding:12, borderRadius:8}}>
              <img src={p.images?.[0]||'/assets/product.jpg'} style={{width:'100%', height:120, objectFit:'cover', borderRadius:6}} />
              <h4>{p.title}</h4>
              <p>{(p.price_cents/100).toFixed(2)} EGP</p>
              <a className="btn" href={"/admin/products/edit?slug="+p.slug}>تعديل</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
