import { FormInputs } from '@/components/form'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  generatedBio: string[]
}

const openAiMode = {
  model: 'text-davinci-003',
  temperature: 0.9,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 300,
  n: 1,
}

const promptGen = (params: FormInputs) => {
  return {
    prompt: `Generate 3 ${
      params.socialNetwork
    } bios with no hashtags (clearly labled 1,2 and 3.) for based off the following prompt "${
      params.prompt
    }" And make the tone of voice "${params.mood}"${
      params.hashtags ? ' use hashtags' : ''
    } ${params.emojis ? ' use emojis where possible ' : ''}`,
  }
}

const postToOpenApi = async (data: any) => {
  try {
    console.log(JSON.stringify(data))
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPEN_API_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const formInputs = req.body.data as FormInputs
  console.log(formInputs)
  const collected = { ...openAiMode, ...promptGen(formInputs) }
  console.log(collected)
  const apiData = postToOpenApi(collected)
  const returnedData = openApiCleaner(apiData)
  res.status(200).json({
    generatedBio: returnedData,
  })
}

export interface OpenApiResponse {
  choices: Choice[]
}

export interface Choice {
  text: string
}

const openApiCleaner = (data: any): string[] => {
  const filteredData = data as OpenApiResponse
  if (filteredData.choices[0]) {
    const data = filteredData.choices[0].text
      .trim()
      .replace('\n', ' ')
      .split(/\r?\n/)
      .filter((v) => v != '')
      .map((string) => string.slice(1, -1))
    return data
  }
  return []
}
