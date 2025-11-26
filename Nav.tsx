
import Link from 'next/link'
export default function Nav(){
  return (
    <nav className="topnav" dir="rtl">
      <div className="container">
        <Link href="/"><a className="brand">BeMoStore</a></Link>
        <div className="links">
          <Link href="#products"><a>منتجات</a></Link>
          <Link href="/checkout"><a>الدفع</a></Link>
        </div>
      </div>
    </nav>
  )
}
