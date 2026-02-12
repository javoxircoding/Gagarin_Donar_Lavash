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
        { error: "Ma'lumotlar to'liq emas" },
        { status: 400 }
      )
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: "Telegram sozlanmagan" },
        { status: 500 }
      )
    }

    // Taomlar ro'yxatini shakllantirish (so'mda chiqarish)
    const itemsList = body.items
      .map(
        (item) =>
          `  - ${item.name} x${item.quantity} — ${(item.price * item.quantity).toLocaleString()} so'm`
      )
      .join("\n")

    // Telegram xabar matni (Gagarin Donar uslubida)
    const message = `🚀 *YANGI BUYURTMA — GAGARIN DONAR*

👤 *Mijoz:* ${escapeMarkdown(body.name)}
📞 *Telefon:* ${escapeMarkdown(body.phone)}
📍 *Manzil:* ${escapeMarkdown(body.address)}
${body.notes ? `📝 *Eslatma:* ${escapeMarkdown(body.notes)}` : ""}

🛒 *Taomlar:*
${itemsList}

💰 *Jami summa: ${body.total.toLocaleString('ru-RU')} so'm*`

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
      console.error("Telegram API xatosi:", errorData)
      return NextResponse.json(
        { error: "Xabarni yuborishda xatolik yuz berdi" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Buyurtma xatosi:", error)
    return NextResponse.json(
      { error: "Server ichki xatosi" },
      { status: 500 }
    )
  }
}


function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&")
}