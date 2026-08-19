// EduVinci - Form gönderimlerini WhatsApp'a yönlendiren yardımcı.
// Backend/veritabanı gerektirmez. Form "Gönder"e basıldığında
// dolu bilgilerle WhatsApp sohbeti açılır.

export const WHATSAPP_NUMBER = "393514293029"; // +39 351 429 3029

function buildMessage(title, fields) {
  const lines = [title, ""];
  for (const [label, value] of fields) {
    if (value && String(value).trim() !== "") {
      lines.push(`${label}: ${value}`);
    }
  }
  return lines.join("\n");
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function sendConsultationToWhatsApp(data) {
  const msg = buildMessage("🎓 Yeni Danışmanlık Talebi — EduVinci", [
    ["Ad Soyad", data.name],
    ["E-posta", data.email],
    ["Telefon", data.phone],
    ["Hedef Program", data.target_program],
    ["Mesaj", data.message],
  ]);
  openWhatsApp(msg);
}

export function sendContactToWhatsApp(data) {
  const msg = buildMessage("✉️ Yeni İletişim Mesajı — EduVinci", [
    ["Ad Soyad", data.name],
    ["E-posta", data.email],
    ["Telefon", data.phone],
    ["Hedef Program", data.target_program],
    ["Mesaj", data.message],
  ]);
  openWhatsApp(msg);
}

export function sendWebinarToWhatsApp(data) {
  const msg = buildMessage("📅 Yeni Webinar Kaydı — EduVinci", [
    ["Ad Soyad", data.name],
    ["E-posta", data.email],
    ["Telefon", data.phone],
    ["Hedef Program", data.target_program],
    ["Etkinlik", data.event_slug],
  ]);
  openWhatsApp(msg);
}
