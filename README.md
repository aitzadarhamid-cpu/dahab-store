---
title: DAHAB Bijoux
emoji: 💛
colorFrom: yellow
colorTo: gray
sdk: docker
app_port: 7860
pinned: true
license: other
---

# DAHAB — Bijouterie en Ligne Marocaine

Boutique e-commerce de bijoux haut de gamme pour le marché marocain.
Paiement à la livraison (COD), livraison partout au Maroc.

## Stack

- **Frontend** : Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend** : Next.js API Routes, Prisma ORM
- **Base de données** : PostgreSQL (Neon)
- **Images** : Cloudflare R2 (CDN mondial, PoPs MENA)
- **Emails** : Resend (transactionnels)
- **Auth** : JWT (jose) + bcryptjs
- **Déploiement** : Hugging Face Spaces (Docker, port 7860)

## Déploiement HF Spaces

L'application tourne comme un container Docker stateless sur Hugging Face Spaces.
Toutes les données persistent en dehors du container :

| Donnée | Stockage |
|--------|---------|
| Commandes, produits, clients | Neon PostgreSQL (`DATABASE_URL`) |
| Images produits | Cloudflare R2 (`CLOUDFLARE_R2_*`) |
| Emails transactionnels | Resend (`RESEND_API_KEY`) |

### Variables d'environnement (HF Secrets)

```
DATABASE_URL=postgresql://...@neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://...@neon.tech/neondb?sslmode=require
JWT_SECRET=<openssl rand -base64 48>
ADMIN_EMAIL=admin@dahab.ma
ADMIN_PASSWORD=<mot-de-passe-fort>
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=DAHAB <noreply@dahab.ma>
WHATSAPP_PHONE=+212XXXXXXXXX
CLOUDFLARE_R2_ACCOUNT_ID=...
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET_NAME=dahab-images
CLOUDFLARE_R2_PUBLIC_URL=https://images.dahab.ma
```

### Build Args (HF Space Build Args)

```
NEXT_PUBLIC_SITE_URL=https://{username}-dahab.hf.space
NEXT_PUBLIC_WHATSAPP_PHONE=+212XXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=<optionnel>
NEXT_PUBLIC_GA_ID=<optionnel>
```

## Développement local

```bash
# 1. Cloner
git clone <repo-url> dahab && cd dahab

# 2. Dépendances
npm install

# 3. Environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 4. Base de données + seed
npx prisma migrate dev
npx prisma db seed

# 5. Serveur dev
npm run dev
# → http://localhost:3000
```

## Test Docker local

```bash
# Build + run (miroir de la prod HF)
docker-compose up --build
# → http://localhost:7860
```

## Tableau de bord unifié

| Service | URL | Rôle |
|---------|-----|------|
| 🏠 Store live | `https://{user}-dahab.hf.space` | Boutique publique |
| 🔧 Admin DAHAB | `.../admin` | Commandes, produits, promos |
| 🤗 HF Space | `huggingface.co/spaces/{user}/dahab` | Rebuild, logs, secrets |
| 🗄️ Neon DB | `console.neon.tech` | Base de données |
| 🖼️ Cloudflare R2 | `dash.cloudflare.com → R2` | Images produits |
| ☁️ Cloudflare DNS | `dash.cloudflare.com → domaine` | DNS, WAF, SSL |
| 📧 Resend | `resend.com/emails` | Logs emails transactionnels |
| 💓 Health | `.../api/health` | Statut app + DB en temps réel |

## Structure

```
src/
├── app/
│   ├── (store)/          # Pages publiques (boutique)
│   ├── (admin)/admin/    # Dashboard admin
│   └── api/              # API Routes
├── components/
│   ├── ui/               # Composants UI réutilisables
│   ├── store/            # Composants boutique
│   ├── admin/            # Composants admin
│   └── marketing/        # Composants conversion
├── lib/                  # Utilitaires (storage R2, email, auth…)
└── types/                # Types TypeScript
```
