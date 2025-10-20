import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const auth = req.headers.get('authorization') || undefined

    // Encaminha o payload ao backend FastAPI
    const res = await fetch('http://localhost:8000/produtos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
    })

    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (err: any) {
    console.error('Erro ao criar produto:', err)
    const msg = err?.message || 'Erro interno'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
