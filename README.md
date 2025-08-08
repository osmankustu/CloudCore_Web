# CloudCore Web UI

Bu proje, Next.js tabanlı bir frontend uygulamasıdır. Ortam ayrımına uygun olarak geliştirme (dev), test (staging) ve canlı (production) ortamlarında çalışacak şekilde yapılandırılmıştır.

## 📦 Kurulum

Projeyi klonladıktan sonra bağımlılıkları yükleyin:

```bash
npm install
```

> `node >=18` önerilir.

---

## 🚀 Çalıştırma Komutları

### Geliştirme Ortamı (Dev)

```bash
npm run dev
```

- Next.js uygulamasını geliştirme modunda başlatır (HMR aktiftir).
- `NODE_ENV=development`

---

## 🛠️ Build Komutları

Build işlemleri, farklı ortamlar için ayrı ayrı yapılandırılmıştır:

### Geliştirme Build'i

```bash
npm run build:dev
```

- `NODE_ENV=development` ile build alınır.

### Staging Build'i

```bash
npm run build:staging
```

- `NODE_ENV=staging` ile build alınır.
- Genellikle staging API'leri ve config'leriyle test amaçlı kullanılır.

### Production Build'i

```bash
npm run build:prod
```

- `NODE_ENV=production` ile optimize bir build oluşturulur.
- Canlıya çıkmadan önce bu komut kullanılır.

---

## ⚙️ Başlatma Komutları

Build sonrası ortamı başlatmak için:

### Geliştirme Ortamı

```bash
npm run start:dev
```

### Staging Ortamı

```bash
npm run start:staging
```

### Production Ortamı

```bash
npm run start:prod
```

> Tüm komutlar ilgili `NODE_ENV` ile uygulamayı başlatır.

---

## 🧹 Lint Kontrolü

```bash
npm run lint
```

- ESLint ile kod kalitesini kontrol eder.
- Flat config sistemiyle yapılandırılmıştır.

---

## 📁 Ortam Değişkenleri (ENV)

Farklı ortamlar için `.env` dosyaları kullanılabilir:

- `.env.development`
- `.env.staging`
- `.env.production`

> Ortamlar `NODE_ENV` değişkenine göre otomatik yüklenir.

---

## 🧪 CI/CD Bilgisi

Bu proje, GitHub Actions üzerinden 3 farklı Node.js sürümünde (`18.x`, `20.x`, `22.x`) otomatik olarak build ve test edilir.

---

## 👨‍💻 Geliştirici Notu

Her ortam için ayrı build almak **zorunludur**. Örneğin:

```bash
npm run build:staging && npm run start:staging
```

Bu komut staging ortamı için doğru yapılandırmayı sağlar.
