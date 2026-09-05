import { Resend } from "resend";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_SUBJECT_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 5000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requestTimestamps = new Map();

const cleanText = (value, maxLength) =>
  String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);

const getClientIp = (request) => {
  const forwardedFor = request.headers["x-forwarded-for"];
  return String(forwardedFor || request.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método não permitido." });
  }

  const clientIp = getClientIp(request);
  const lastRequest = requestTimestamps.get(clientIp) || 0;
  if (Date.now() - lastRequest < 30_000) {
    return response
      .status(429)
      .json({ error: "Aguarde alguns segundos antes de tentar novamente." });
  }

  const body = request.body || {};
  if (body.website) {
    return response.status(400).json({ error: "Solicitação inválida." });
  }

  const name = cleanText(body.name, MAX_NAME_LENGTH);
  const email = cleanText(body.email, MAX_EMAIL_LENGTH).toLowerCase();
  const phone = cleanText(body.phone, MAX_PHONE_LENGTH);
  const subject = cleanText(body.subject, MAX_SUBJECT_LENGTH);
  const message = cleanText(body.message, MAX_MESSAGE_LENGTH);

  if (
    name.length < 2 ||
    !emailPattern.test(email) ||
    message.length < 10 ||
    !subject
  ) {
    return response.status(400).json({ error: "Confira os dados enviados." });
  }

  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_EMAIL ||
    !process.env.FROM_EMAIL
  ) {
    console.error("Variáveis de ambiente do contato não configuradas.");
    return response
      .status(500)
      .json({ error: "Serviço de contato indisponível." });
  }

  requestTimestamps.set(clientIp, Date.now());

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject,
      text: [
        "Novo contato pelo site",
        "",
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Telefone: ${phone || "Não informado"}`,
        `Assunto: ${subject}`,
        "",
        "Mensagem:",
        message,
      ].join("\n"),
    });

    if (emailResult.error) {
      console.error("Erro ao enviar contato:", emailResult.error);
      return response.status(502).json({ error: "Falha no envio." });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Exceção ao enviar contato:", error);
    return response.status(502).json({ error: "Falha no envio." });
  }
}