'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

export type FormInputs = {
  prompt: string
  mood: string
  socialNetwork: string
  hashtags?: boolean
  emojis?: boolean
}

type Data = {
  generatedBio: string
}

const moodList = [
  { text: 'Professional', emoji: '💼' },
  { text: 'Serious', emoji: '🦾' },
  { text: 'Happy', emoji: '😊' },
  { text: 'Energetic', emoji: '🔥' },
  { text: 'Funny', emoji: '🤣' },
  { text: 'Blase', emoji: ' 😴' },
]

const socialNetwork = ['Twitter', 'Instagram', 'BeReal', 'TikTok']

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()
  const [returnedBio, setReturnedBio] = useState<string[]>()
  const [loading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
      const { generatedBio } = await response.json()
      setReturnedBio(generatedBio)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="my-4">
        <label className="block text-sm font-medium mb-4">Prompt?</label>
        {errors.prompt && (
          <span className="text-xs text-red-500">
            This is of course required
          </span>
        )}
        <textarea
          placeholder="e.g - Influencer based in London UK, posting daily about living a postive life. "
          className={`resize-y mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            errors.prompt && 'border-red-500 bg-red-100'
          }`}
          {...register('prompt', { required: true })}
        />
      </section>
      <section className="my-4">
        <label className="block text-sm font-medium mb-4">Mood?</label>
        <select
          className="border border-gray-300 text-gray-900 w-full font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center"
          defaultValue={moodList[4].text}
          {...register('mood', { required: true })}
        >
          {moodList.map((mood) => (
            <option
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              key={mood.text}
              value={mood.text}
            >
              {`${mood.emoji} ${mood.text}`}
            </option>
          ))}
        </select>
      </section>
      <section className="my-4">
        <label className="block text-sm font-medium mb-4">Social network</label>
        <select
          className="border border-gray-300 text-gray-900 w-full font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center"
          defaultValue={socialNetwork[0]}
          {...register('socialNetwork', { required: true })}
        >
          {socialNetwork.map((socialNetwork) => (
            <option
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              key={socialNetwork}
              value={socialNetwork}
            >
              {socialNetwork}
            </option>
          ))}
        </select>
      </section>
      <section className="flex justify-around">
        <label className="inline-flex flex-col items-center cursor-pointer">
          <span className="text-sm mb-2 font-medium text-gray-900 dark:text-gray-300">
            With emojis?
          </span>
          <section className="relative">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              {...register('emojis')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          </section>
        </label>
        <label className="inline-flex flex-col items-center cursor-pointer">
          <span className="text-sm mb-2 font-medium text-gray-900 dark:text-gray-300">
            With hashtags?
          </span>
          <section className="relative">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              {...register('hashtags')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          </section>
        </label>
      </section>

      <button
        type="submit"
        className="mt-8 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        {loading ? (
          <div>
            <span className="inline-flex items-center gap-px">
              <span className="animate-blink mx-px h-1.5 w-1.5 rounded-full bg-white" />
              <span className="animate-blink animation-delay-200 mx-px h-1.5 w-1.5 rounded-full bg-white" />
              <span className="animate-blink animation-delay-[400ms] mx-px h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </div>
        ) : (
          'Submit'
        )}
      </button>
      {returnedBio && (
        <section className="my-4">
          <label className="block text-sm mb-4 font-medium">
            ❤️❤️ Your new bio&apos;s ❤️❤️
          </label>
          {returnedBio.map((bio) => (
            <div
              key={bio.length}
              className="block p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <p className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                {bio}
              </p>
            </div>
          ))}
        </section>
      )}
    </form>
  )
}
