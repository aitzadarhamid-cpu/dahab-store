# DAHAB - Bijouterie en Ligne Marocaine

Boutique e-commerce de bijoux pour le marche marocain. Paiement a la livraison (COD), livraison partout au Maroc.

## Stack technique

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de donnees**: SQLite (dev) / PostgreSQL (prod)
- **Authentification**: JWT (jose) + bcryptjs
- **Validation**: Zod + react-hook-form
- **Analytics**: Meta Pixel + Google Analytics 4

## Installation rapide

```bash
# 1. Cloner le projet
git clone <repo-url> dahab
cd dahab

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Editer .env avec vos valeurs

# 4. Creer la base de donnees et inserer les donnees
npx prisma db push
npx prisma db seed

# 5. Lancer le serveur de developpement
npm run dev
```

Le site sera accessible sur http://localhost:3000

## Credentials admin

Apres le seed, les identifiants admin sont affiches dans la console:

- **Email**: admin@dahab.ma
- **Mot de passe**: Dahab2024!

Changez ces identifiants en production!

## Configuration pour la production

### Variables d'environnement requises

```
DATABASE_URL=postgresql://user:password@host:5432/dahab
JWT_SECRET=votre-secret-jwt-securise-min-32-chars
NEXT_PUBLIC_META_PIXEL_ID=votre-pixel-id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
WHATSAPP_PHONE=+212XXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://votre-domaine.ma
```

### Deploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Deployer
vercel --prod
```

Configurez les variables d'environnement dans les parametres du projet Vercel.

Pour PostgreSQL en production, utilisez Vercel Postgres ou Supabase.

## Structure du projet

```
src/
├── app/
│   ├── (store)/          # Pages publiques (boutique)
│   ├── (admin)/admin/    # Dashboard admin
│   └── api/              # API Routes
├── components/
│   ├── ui/               # Composants UI reutilisables
│   ├── store/            # Composants boutique
│   ├── admin/            # Composants admin
│   └── marketing/        # Composants conversion
├── hooks/                # React hooks (cart, countdown, etc.)
├── lib/                  # Utilitaires et configuration
├── data/                 # Donnees statiques (villes, seed)
└── types/                # Types TypeScript
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil avec bestsellers |
| `/boutique` | Catalogue avec filtres |
| `/produit/[slug]` | Fiche produit |
| `/commander` | Checkout COD |
| `/confirmation` | Confirmation de commande |
| `/admin/login` | Connexion admin |
| `/admin` | Dashboard admin |
| `/admin/orders` | Gestion des commandes |
| `/admin/products` | Gestion des produits |

## Personnalisation

### Numero WhatsApp
Modifiez `WHATSAPP_PHONE` dans `.env` avec votre numero au format E.164

### Couleurs
Les couleurs de la marque sont dans `tailwind.config.ts` sous `brand`

### Produits
Ajoutez des produits via le dashboard admin ou editez `prisma/seed.ts`
