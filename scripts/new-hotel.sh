#!/bin/bash
#
# New Hotel Setup Script
#
# Usage: ./scripts/new-hotel.sh <hotel-name> <domain>
# Example: ./scripts/new-hotel.sh eden-roc edenroccapcana.com
#
# This script helps set up a new hotel site from the template.
# Run it from the hotel-cms-template repository root.

set -e

HOTEL_NAME=${1:?"Usage: $0 <hotel-name> <domain>"}
DOMAIN=${2:?"Usage: $0 <hotel-name> <domain>"}
REPO_DIR="../${HOTEL_NAME}"

echo ""
echo "🏨 Setting up new hotel: ${HOTEL_NAME}"
echo "   Domain: ${DOMAIN}"
echo "   Directory: ${REPO_DIR}"
echo ""

# 1. Clone the template
if [ -d "$REPO_DIR" ]; then
  echo "Error: Directory ${REPO_DIR} already exists"
  exit 1
fi

echo "→ Cloning template..."
cp -r . "$REPO_DIR"
cd "$REPO_DIR"

# 2. Remove git history and start fresh
rm -rf .git
git init
git branch -M main

# 3. Update package.json
echo "→ Updating package.json..."
sed -i "s/\"name\": \".*\"/\"name\": \"${HOTEL_NAME}\"/" package.json

# 4. Create .env.local template
echo "→ Creating .env.local..."
cat > .env.local << EOF
DATABASE_URL=postgresql://...
BLOB_READ_WRITE_TOKEN=vercel_blob_...
JWT_SECRET=$(openssl rand -hex 32)
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
EOF

echo ""
echo "✓ Hotel project created at ${REPO_DIR}"
echo ""
echo "Next steps:"
echo "  1. Create a Neon database named '${HOTEL_NAME}'"
echo "  2. Update DATABASE_URL in .env.local"
echo "  3. Create Vercel project and Blob store"
echo "  4. Update BLOB_READ_WRITE_TOKEN in .env.local"
echo "  5. Run: npm install"
echo "  6. Run: npx prisma db push"
echo "  7. Customize theme.config.ts with hotel branding"
echo "  8. Update prisma/seed.ts with hotel content"
echo "  9. Run: npm run db:seed"
echo " 10. Run: npm run dev"
echo ""
