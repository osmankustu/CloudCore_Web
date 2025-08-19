// app/support/page.tsx  (veya pages/support.tsx)

"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Şifremi unuttum, nasıl sıfırlayabilirim?",
    a: "Giriş ekranında 'Şifremi Unuttum' butonuna tıklayarak e-posta adresine gelen link ile şifreni sıfırlayabilirsin.",
  },
  {
    q: "Fatura bilgilerimi nasıl güncellerim?",
    a: "Hesap ayarları > Faturalandırma sekmesinden güncelleme yapabilirsin.",
  },
  {
    q: "Destek ekibine nasıl ulaşabilirim?",
    a: "Bu sayfadaki formu doldurabilir veya destek@seninsirketin.com adresine e-posta gönderebilirsin.",
  },
];

export default function SupportPage() {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📩 Gönderilen destek isteği:", form);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto space-y-8 p-6">
      <h1 className="text-3xl font-bold">Destek</h1>
      <p className="text-gray-600">
        Sorunun mu var? Önce sık sorulan sorulara göz atabilir veya form üzerinden bize
        ulaşabilirsin.
      </p>

      {/* --- SSS Bölümü --- */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Sık Sorulan Sorular</h2>
        {faqs.map((item, idx) => (
          <div key={idx} className="rounded-md border">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="flex w-full items-center justify-between px-4 py-2 text-left font-medium"
            >
              {item.q}
              <span>{open === idx ? "−" : "+"}</span>
            </button>
            {open === idx && <div className="px-4 pb-3 text-gray-600">{item.a}</div>}
          </div>
        ))}
      </div>

      {/* --- Destek Formu --- */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Destek Talebi Oluştur</h2>
        {submitted ? (
          <div className="rounded-lg bg-green-100 p-4 text-green-800">
            ✅ Talebin alındı, en kısa sürede sana geri döneceğiz.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
          >
            <div>
              <label className="mb-1 block text-sm font-medium">Konu</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Mesaj</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
            >
              Gönder
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
