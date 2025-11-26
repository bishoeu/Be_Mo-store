
import Head from 'next/head'
export default function Success(){
  return (
    <>
      <Head><title>تم استلام الطلب — BeMoStore</title></Head>
      <main dir="rtl" className="container" style={{paddingTop:40}}>
        <h1>تم استلام طلبك</h1>
        <p>شكراً لك! هذا مجرد مثال تجريبي — ستتلقى تفاصيل الطلب في صفحة الإدارة بعد ربط Backend.</p>
      </main>
    </>
  );
}
