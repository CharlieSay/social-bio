import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
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
      <footer className="text-center dark:text-white mt-16 text-slate-500 container max-w-2xl mx-auto px-4 md:px-32 lg:px-32 flex justify-around">
        <section className="flex flex-col justify-center">
          <Link href="https://talesoft.digital/">
            <p className="text-xs">By</p>
            <Image
              className="mx-auto mt-2 fill-black dark:fill-white relative drop-shadow-2xl"
              src="/talesoft.svg"
              alt="Next.js Logo"
              width={90}
              height={18}
            />
          </Link>
        </section>
        <section className="flex flex-col justify-center">
          <Link href="nextjs.org">
            <p className="text-xs">Created with</p>
            <Image
              className="mx-auto mt-2 dark:fill-white relative drop-shadow-2xl"
              src="/next.svg"
              alt="Next.js Logo"
              width={90}
              height={18}
            />
          </Link>
        </section>
      </footer>
    </html>
  )
}
