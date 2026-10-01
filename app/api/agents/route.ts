import { generateText, gateway } from 'ai'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const AGENTS = {
  'buyer-intent': {
    name: 'Buyer intent analyst',
    instruction: 'Analyze buyer intent signals and return three concise, actionable priorities for the revenue team.',
  },
  'campaign-optimizer': {
    name: 'Campaign optimiser',
    instruction: 'Review campaign performance context and return three practical optimization recommendations.',
  },
  'inventory-matcher': {
    name: 'Inventory matcher',
    instruction: 'Identify the best inventory matching opportunities from the supplied context and explain why.',
  },
  attribution: {
    name: 'Revenue attribution',
    instruction: 'Summarize likely revenue attribution patterns and list the next measurement actions.',
  },
} as const

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 })

  try {
    const body = await request.json() as { agent?: keyof typeof AGENTS; context?: unknown }
    const agent = body.agent && AGENTS[body.agent]
    if (!agent) return NextResponse.json({ error: 'Unknown agent' }, { status: 400 })

    const context = typeof body.context === 'string' ? body.context.slice(0, 4000) : 'No additional workspace context was provided.'
    const result = await generateText({
      model: gateway('openai/gpt-4o-mini'),
      system: `You are the ${agent.name} for a revenue operations workspace. ${agent.instruction} Be specific, concise, and do not invent access to systems or data.`,
      prompt: context,
      maxOutputTokens: 500,
    })

    return NextResponse.json({ agent: agent.name, result: result.text })
  } catch {
    return NextResponse.json({ error: 'The agent is temporarily unavailable' }, { status: 502 })
  }
}
