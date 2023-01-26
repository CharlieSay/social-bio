import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="text-center bg-slate-100 container max-w-2xl mx-auto px-4 md:px-32 lg:px-32">
        {children}
      </body>
    </html>
  )
}
