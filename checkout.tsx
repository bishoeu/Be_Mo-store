
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Checkout(){
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  async function placeOrder(e){
    e.preventDefault();
// Build order payload and submit to server-side orders API
const payload = { merchant_order_id: 'mo_' + Date.now(), amount_cents: 49900, currency: 'EGP', billing_data:{name, phone}, items: [{title:'Demo', price_cents:49900}], payment_method: paymentMethod };
try {
  const resp = await fetch('/api/orders/create', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  const data = await resp.json();
  if(resp.ok){
    // if COD, redirect to success; if online, redirect to payment url (if provided)
    if(data.payment_url){ window.location.href = data.payment_url; return; }
    router.push('/success');
    return;
  } else {
    alert('خطأ في إنشاء الطلب: ' + (data.error||''));
    return;
  }
} catch(err){ alert('خطأ شبكي'); console.error(err); return; }
    if(!name || !phone){ alert('يرجى ملء الحقول'); return;}
    const order = {id: Date.now(), name, phone, created: new Date().toISOString()};
    if(typeof window !== 'undefined'){
      const orders = JSON.parse(localStorage.getItem('bemo_orders')||'[]');
      orders.push(order);
      localStorage.setItem('bemo_orders', JSON.stringify(orders));
    }
    router.push('/success');
  }

  return (
    <>
      <Head><title>Checkout — BeMoStore</title></Head>
      <main dir="rtl" className="container" style={{paddingTop:40}}>
        <h1>الدفع</h1>
        <form onSubmit={placeOrder} className="checkout-form">
          <label>الاسم الكامل<input value={name} onChange={e=>setName(e.target.value)} /></label>
          <label>رقم الهاتف<input value={phone} onChange={e=>setPhone(e.target.value)} /></label>
<div>
  <label><input type="radio" name="pay" value="cod" checked={paymentMethod==='cod'} onChange={()=>setPaymentMethod('cod')} /> الدفع عند الاستلام</label>
  <label style={{marginLeft:12}}><input type="radio" name="pay" value="online" checked={paymentMethod==='online'} onChange={()=>setPaymentMethod('online')} /> الدفع أونلاين (بطاقة)</label>
</div>

          <button type="submit" className="btn primary">تأكيد الطلب (تجريبي)</button>
        </form>
        <p>ملاحظة: هذه صفحة دفع تجريبية. لإضافة بوابة دفع حقيقي سأقدم لك كود ربط لـ Paymob / Fawry / PayTabs.</p>
      </main>
    </>
  );
}
