#!/bin/bash

curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm install --frozen-lockfile
pnpm build
node -r dotenv/config build