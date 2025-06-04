
import Navbar from "@/components/Navbar";




export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode; 
}>) {
  return (
    <html lang="en">
      <body className=" bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        
        <Navbar/>
        {children}
       
        </body>
    </html>
  );
}
