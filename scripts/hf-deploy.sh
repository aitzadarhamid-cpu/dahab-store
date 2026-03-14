#!/bin/bash
# =============================================================
# DAHAB — Script de déploiement Hugging Face Spaces
# Usage: bash scripts/hf-deploy.sh
# =============================================================

set -e

HF_USER="dahab-bijoux"
SPACE_NAME="dahab"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   DAHAB 💛 — Déploiement Hugging Face    ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ── Étape 1 : Token ────────────────────────────────────────────
echo "🔑 Entre ton token HF (commence par hf_)."
echo "   (le texte ne s'affiche pas pour ta sécurité)"
read -r -s -p "   Token HF : " HF_TOKEN
echo ""

if [[ ! "$HF_TOKEN" == hf_* ]]; then
  echo "❌ Token invalide — doit commencer par hf_"
  exit 1
fi
echo "   ✅ Token reçu."
echo ""

# ── Étape 2 : Créer le Space via API ───────────────────────────
echo "🚀 Création du Space HF '${HF_USER}/${SPACE_NAME}'..."

HTTP_STATUS=$(curl -s -o /tmp/hf_create_response.json -w "%{http_code}" \
  -X POST "https://huggingface.co/api/repos/create" \
  -H "Authorization: Bearer ${HF_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"space\",
    \"name\": \"${SPACE_NAME}\",
    \"private\": false,
    \"sdk\": \"docker\"
  }")

if [[ "$HTTP_STATUS" == "200" ]] || [[ "$HTTP_STATUS" == "409" ]]; then
  if [[ "$HTTP_STATUS" == "409" ]]; then
    echo "   ℹ️  Space déjà existant — on continue."
  else
    echo "   ✅ Space créé : https://huggingface.co/spaces/${HF_USER}/${SPACE_NAME}"
  fi
else
  echo "   ❌ Erreur création Space (HTTP $HTTP_STATUS) :"
  cat /tmp/hf_create_response.json
  exit 1
fi
echo ""

# ── Étape 3 : Remote git ───────────────────────────────────────
HF_REMOTE_URL="https://dahab-bijoux:${HF_TOKEN}@huggingface.co/spaces/${HF_USER}/${SPACE_NAME}"

cd "$REPO_DIR"

if git remote get-url hf &>/dev/null; then
  echo "🔗 Remote 'hf' déjà configuré — mise à jour..."
  git remote set-url hf "$HF_REMOTE_URL"
else
  echo "🔗 Ajout du remote 'hf'..."
  git remote add hf "$HF_REMOTE_URL"
fi
echo "   ✅ Remote 'hf' configuré."
echo ""

# ── Étape 4 : Push ─────────────────────────────────────────────
echo "📤 Push vers Hugging Face Spaces..."
echo "   (le build Docker commence automatiquement après le push)"
echo ""

GIT_TERMINAL_PROMPT=0 git push hf main --force

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   ✅ Push terminé !                       ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "📍 Ton Space : https://huggingface.co/spaces/${HF_USER}/${SPACE_NAME}"
echo "🏗️  Build en cours — suis les logs ici :"
echo "   https://huggingface.co/spaces/${HF_USER}/${SPACE_NAME}?logs=build"
echo ""
echo "⏱️  Le build prend ~5-8 min (npm install + next build dans Docker)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚡ Prochaine étape : ajouter les Secrets HF"
echo "   https://huggingface.co/spaces/${HF_USER}/${SPACE_NAME}/settings"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
