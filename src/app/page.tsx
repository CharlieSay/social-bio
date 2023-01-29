import { Form } from '@/components/form'

export default function Home() {
  return (
    <main className="pt-24">
      <h1 className="leading-none tracking-normal md:text-6xl md:tracking-tight block w-full py-2 animate-text bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent  text-5xl font-black lg:inline text-center">
        SocialBio
      </h1>
      <p className="my-4 text-lg dark:text-white text-gray-600 md:text-xl ">
        Put a prompt in and let{' '}
        <span className="underline decoration-orange-400 font-black bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
          ai
        </span>{' '}
        generate a{' '}
        <span className="underline decoration-orange-400 font-black bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
          new
        </span>{' '}
        media bio for you
      </p>
      <Form />
    </main>
  )
}
