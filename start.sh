#!/bin/bash

export NODE_ENV=production
curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm install --frozen-lockfile
pnpm dlx prisma migrate deploy
pnpm dlx prisma generate
pnpm build
node -r dotenv/config build