import { NextResponse } from "next/server"

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderPayload {
  name: string
  phone: string
  address: string
  notes: string
  items: OrderItem[]
  total: number
}

export async function POST(request: Request) {
  try {
    const body: OrderPayload = await request.json()

    if (!body.name || !body.phone || !body.address || !body.items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: "Telegram not configured" },
        { status: 500 }
      )
    }

    const itemsList = body.items
      .map(
        (item) =>
          `  - ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n")

    const message = `🍔 *NEW ORDER*

👤 *Customer:* ${escapeMarkdown(body.name)}
📞 *Phone:* ${escapeMarkdown(body.phone)}
📍 *Address:* ${escapeMarkdown(body.address)}
${body.notes ? `📝 *Notes:* ${escapeMarkdown(body.notes)}` : ""}

🛒 *Items:*
${itemsList}

💰 *Total: $${body.total.toFixed(2)}*`

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Telegram API error:", errorData)
      return NextResponse.json(
        { error: "Failed to send order notification" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Order processing error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&")
}
