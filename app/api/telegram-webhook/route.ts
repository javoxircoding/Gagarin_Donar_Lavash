import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.callback_query) {
      const callbackData = body.callback_query.data;
      const message = body.callback_query.message;
      const chatId = message.chat.id;
      const messageId = message.message_id;
      const oldText = message.text;

      let statusLine = "";
      if (callbackData === "order_accept") {
        statusLine = "\n\n✅ **HOLAT: QABUL QILINDI**";
      } else if (callbackData === "order_reject") {
        statusLine = "\n\n❌ **HOLAT: RAD ETILDI**";
      }

      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/editMessageText`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text: `${oldText}${statusLine}`,
          parse_mode: "Markdown",
          reply_markup: { inline_keyboard: [] } 
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false });
  }
}