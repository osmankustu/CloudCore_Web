// LandingPage.jsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans text-blue-900">
      {/* Header */}
      <header className="bg-opacity-80 fixed top-0 right-0 left-0 z-50 bg-white shadow-md backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Left side - Logo + Menu */}
          <div className="flex items-center space-x-12">
            <div
              className="cursor-pointer text-2xl font-extrabold text-blue-700 select-none"
              onClick={() => router.push("/")}
              aria-label="CloudCore Logo"
            >
              Cloud Core
            </div>
            <ul className="hidden space-x-8 font-medium text-blue-700 md:flex">
              <li>
                <button onClick={() => router.push("/")} className="transition hover:text-blue-900">
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/faq")}
                  className="transition hover:text-blue-900"
                >
                  SSS
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/contact")}
                  className="transition hover:text-blue-900"
                >
                  İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Right side - Giriş Yap */}
          <div>
            <button
              onClick={() => router.push("/signin")}
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white shadow-md transition hover:bg-blue-700"
            >
              Giriş Yap
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-6 pt-24 text-center">
        <h1 className="mb-6 max-w-4xl text-5xl leading-tight font-extrabold drop-shadow-md md:text-6xl">
          Bulutların Gücüyle <br />
          <span className="text-blue-600">İşlerinizi Kolaylaştırın</span>
        </h1>

        <p className="mb-12 max-w-3xl text-lg text-blue-800 md:text-xl">
          CloudCore ile personel yönetiminden takım organizasyonuna, tüm iş süreçlerinizi hızlı ve
          güvenli şekilde yönetin.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => router.push("/management")}
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Yönetim Paneline Git
          </button>
          <button
            onClick={() => router.push("/learn-more")}
            className="rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-100"
          >
            Daha Fazla Bilgi
          </button>
        </div>

        {/* Features Section */}
        <section className="mt-20 grid max-w-5xl grid-cols-1 gap-10 text-blue-900 md:grid-cols-3">
          {[
            {
              title: "Kolay Yönetim",
              desc: "Personel ve takımlarınızı zahmetsizce organize edin.",
              icon: (
                <svg
                  className="mb-4 h-14 w-14 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 7a4 4 0 01-8 0" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ),
            },
            {
              title: "Güvenli Erişim",
              desc: "Yetkilendirilmiş kullanıcılar için tam güvenlik sağlanır.",
              icon: (
                <svg
                  className="mb-4 h-14 w-14 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              ),
            },
            {
              title: "Anlık Bildirimler",
              desc: "Önemli gelişmelerden hemen haberdar olun.",
              icon: (
                <svg
                  className="mb-4 h-14 w-14 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8a6 6 0 00-12 0v4H4l4 4h8l4-4h-2z" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              ),
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              className="cursor-pointer rounded-xl bg-blue-100 p-8 shadow-md transition hover:shadow-xl"
            >
              {icon}
              <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </section>

        <footer className="mt-24 mb-12 text-sm text-blue-500 select-none">
          &copy; {new Date().getFullYear()} CloudCore. Tüm hakları saklıdır.
        </footer>
      </main>
    </div>
  );
}
