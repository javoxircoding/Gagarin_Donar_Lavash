import { NextResponse } from "next/server";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderPayload {
  name: string;
  phone: string;
  address: string;
  notes: string;
  items: OrderItem[];
  total: number;
}

export async function POST(request: Request) {
  try {
    const body: OrderPayload = await request.json();

    if (!body.name || !body.phone || !body.address || !body.items?.length) {
      return NextResponse.json({ error: "Ma'lumotlar to'liq emas" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const itemsList = body.items
      .map(item => `  - ${item.name} x${item.quantity} — ${(item.price * item.quantity).toLocaleString('ru-RU')} so'm`)
      .join("\n");

    const formattedPhone = body.phone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "+998 ($1) $2 $3 $4");

    const message = `🚀 *YANGI BUYURTMA — GAGARIN DONAR*
━━━━━━━━━━━━━━━━━━
👤 *Mijoz:* ${escapeMarkdown(body.name)}
📞 *Telefon:* ${escapeMarkdown(formattedPhone)}
📍 *Manzil:* ${escapeMarkdown(body.address)}
${body.notes ? `📝 *Eslatma:* ${escapeMarkdown(body.notes)}` : ""}

🛒 *Taomlar:*
${itemsList}

💰 *Jami summa: ${body.total.toLocaleString('ru-RU')} so'm*
━━━━━━━━━━━━━━━━━━`;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Qabul qilish", callback_data: "order_accept" },
              { text: "❌ Rad etish", callback_data: "order_reject" }
            ]
          ]
        },
      }),
    });

    if (!response.ok) throw new Error("Telegram error");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}