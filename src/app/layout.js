export default function RootLayout({ children }) {
  return (
    // وضعها هنا يغطي أي تغييرات في اللغة أو السيم (Theme) من المتصفح
    <html  suppressHydrationWarning> 
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}