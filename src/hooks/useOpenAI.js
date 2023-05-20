import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import ChatAPI from '../api/ChatAPI'
import { toast } from 'react-toastify'

const config = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export function useOpenAI() {
  const [loading, setLoading] = useState(false)

  const generate = async prompt => {
    setLoading(true)
    try {
      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })
      const message = res.data.choices[0].message.content
      await ChatAPI.sendMessage(message, true)
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Error generating message')
    } finally {
      setLoading(false)
    }
  }

  return { loading, generate }
}
