
import React from 'react';
import './index.css';

const sampleProducts = [
  {id:1,title:'Premium Leather Bag',price:'$129',img:'/assets/bg1.jpg'},
  {id:2,title:'Smartwatch X200',price:'$89',img:'/assets/bg2.jpg'},
  {id:3,title:'Wireless Headphones Pro',price:'$149',img:'/assets/bg3.jpg'},
  {id:4,title:'Designer Sunglasses',price:'$79',img:'/assets/bg4.jpg'},
  {id:5,title:'Minimal Desk Lamp',price:'$49',img:'/assets/bg5.jpg'},
  {id:6,title:'Ceramic Mug Set',price:'$24',img:'/assets/bg6.jpg'},
];

export default function HomeImproved(){
  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <div className="logo">BeMo</div>
          <div>
            <div style={{fontWeight:700}}>BeMo Store</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>Curated goods • Premium + Trendy</div>
          </div>
        </div>
        <nav className="nav">
          <a href="#products">Products</a>
          <a href="#sellers">Sell with us</a>
          <a className="cta" href="#join">Start Selling</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-card">
          <h1>منتجات مختارة بعناية — BeMo</h1>
          <p>مزيج من التصميم العصري والألوان الشابة واللمسات الفاخرة لمنتجات تجذب الزبائن وتزيد معدلات الشراء.</p>
          <div className="cta-row">
            <button className="btn btn-primary" onClick={()=> window.location.hash='#products'}>تسوق الآن</button>
            <button className="btn btn-ghost" onClick={()=> window.location.hash='#sellers'}>بيع منتجاتك</button>
          </div>
        </div>
        <div style={{borderRadius:16, overflow:'hidden'}}>
          <img src="/assets/hero.jpg" alt="hero" style={{width:'100%', height: '100%', objectFit:'cover'}} />
        </div>
      </section>

      <section id="products">
        <h2 style={{margin:0}}>منتجات مميزة</h2>
        <div className="grid" style={{marginTop:12}}>
          {sampleProducts.map(p => (
            <article key={p.id} className="card">
              <img src={p.img} alt={p.title}/>
              <h3>{p.title}</h3>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div className="price">{p.price}</div>
                <div>
                  <button className="btn btn-primary" style={{padding:'8px 12px'}}>Add</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} BeMo Store — Built for conversions. تصميم مزيج Modern + Trendy + Luxury.
      </footer>
    </div>
  )
}
