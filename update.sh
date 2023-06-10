#!/bin/bash

git pull
curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm install --frozen-lockfile
pnpm dlx prisma migrate deploy
pnpm dlx prisma generate
pnpm build