import Anthropic from '@anthropic-ai/sdk'

const provider = process.env.AI_PROVIDER || 'ollama'
const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2:3b'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatOptions {
  maxTokens?: number
  temperature?: number
}

export async function chat(messages: Message[], options: ChatOptions = {}): Promise<string> {
  const { maxTokens = 1024, temperature = 0.7 } = options

  if (provider === 'claude') {
    const client = new Anthropic()
    const systemMsg = messages.find(m => m.role === 'system')
    const chatMsgs = messages
      .filter(m => m.role !== 'system')
      .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      temperature,
      system: systemMsg?.content || '',
      messages: chatMsgs,
    })

    const block = response.content[0]
    return block.type === 'text' ? block.text : ''
  }

  // Ollama
  const body: Record<string, unknown> = {
    model: ollamaModel,
    messages,
    stream: false,
    options: { temperature, num_predict: maxTokens },
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 120000)
  const res = await fetch(`${ollamaUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: controller.signal,
  })
  clearTimeout(timeout)

  if (!res.ok) throw new Error(`Ollama error: ${res.status}`)
  const data = await res.json()
  return data.message?.content || ''
}
