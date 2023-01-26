import './globals.css'
import Image from 'next/image'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="text-center bg-slate-100 dark:bg-zinc-900 container max-w-2xl mx-auto px-4 md:px-32 lg:px-32">
        {children}
      </body>
      <footer className="text-center dark:text-white mt-16 text-slate-500 container max-w-2xl mx-auto px-4 md:px-32 lg:px-32">
        <section className="flex flex-col justify-center">
          <p className="text-xs">Created with</p>
          <Image
            className="mx-auto mt-2 dark:fill-white relative drop-shadow-2xl"
            src="/next.svg"
            alt="Next.js Logo"
            width={90}
            height={18}
          />
        </section>
      </footer>
    </html>
  )
}
