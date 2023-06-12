# Slender AAC

This project is a website for the [Canary](https://github.com/opentibiabr/canary) project. The main goal is to use modern technology to have something that is easy to maintain and extend. It is also meant to be efficient, secure and easy to deploy.

## Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)
- [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/)
  - Running a database compatible with `canary`

### Installation

Clone this repository and install the dependencies:

```bash
git clone https://github.com/luan/slender-aac.git
cd slender-aac
pnpm install
cp .env.dist .env
```

Edit `.env` with your server and desired settings. Then migrate the database using the command below. Note that this assumes your current database already has the `canary` schema imported.

```bash
pnpm migrate:resolve
pnpm migrate
pnpm generate
```

### Running

At this point you should be ready to run the server:

```bash
pnpm dev
```

## Deployment

Deployment depends highly on your server setup. Assuming you are on a Linux dedicated server or VPS. You need the following:

- [Nginx](https://nginx.org/en/)
- [Node.js](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)

As well as a database compatible with `canary`. You can use either [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/).

### Installation

```bash
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs
sudo npm install -g pnpm
sudo apt install -y nginx
```

Clone this repository and install the dependencies:

```bash
git clone https://github.com/luan/slenderaac.git
cd slenderaac
pnpm install
cp .env.dist .env
```

### Nginx

We're just using Nginx as a reverse proxy. You can use any other web server that supports reverse proxying if you'd like. The Nginx configuration is as follows (adjust port and domain as needed if you're not using the defaults):

```nginx
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _;

        location / {
                   proxy_pass http://127.0.0.1:3000;
                   proxy_http_version 1.1;
                   proxy_set_header Upgrade $http_upgrade;
                   proxy_set_header Connection 'upgrade';
                   proxy_set_header Host $host;
                   proxy_cache_bypass $http_upgrade;
       }
}
```

### Building

Because we're now in a production environment, we need to build the project. This will generate the static files that will be served by the nodejs server. This is a one time step, you only need to do this again if you change /update the code.

```bash
pnpm generate
pnpm build
```

### Migrating the database

At this point you should be ready to migrate the database. This will create the necessary tables and columns. Note that this assumes your current database already has the `canary` schema imported.

```bash
pnpm migrate:resolve
pnpm migrate
```

### Running

Finally, we need to run the server, this will run on port 3000 by defaul, which is what we configured Nginx to proxy to.

```bash
node -r dotenv/config build
```

## Features / Roadmap

### Website

- [x] Account management
- [x] Account recovery
- [x] Character management
- [x] Character search
- [x] Highscores
- [x] News
- [x] Static pages
- [x] Coin shop
- [x] I18n (currently only English)
- [x] Animated outfits
- [x] Boosted creature / boss
- [x] Server status
- [x] Who's online
- [x] Themable
- [x] Dark mode
- [x] Responsive design
- [x] Mobile friendly
- [x] Highly secure bcrypt based password hashing
- [x] Account verification
- [ ] Character inventory
- [ ] Two factor auth
- [ ] Server save countdown
- [ ] Guild management
- [ ] Guild wars
- [ ] Multi-world
- [ ] Char bazaar
- [ ] Houses
- [ ] Recent deaths
- [ ] Kill statistics
- [ ] Power gamers
- [ ] World map

### Admin panel

- [x] News management ([markdoc](https://markdoc.dev))
- [x] Static pages management ([markdoc](https://markdoc.dev))
- [x] Easily create first admin account (`AUTO_ADMIN_EMAIL`)
- [ ] Account management
- [ ] Character management
- [ ] Guild management
- [ ] House management
- [ ] Server management
- [ ] Server logs
- [ ] Server configuration
- [ ] Guided installer

### API

- [x] Login
- [x] Login via expiring session for increased security
- [x] Boosted creature / boss
- [x] Online counts
- [ ] Compendium API
- [ ] Events API
- [ ] Other APIs (for discord integration, etc)

## Animated outfits

You'll need to download the spritesheet from [here](https://docs.opentibiabr.com/others/downloads/website-applications/applications#animated-items-and-outfits) and place it in `outfits_anim`. These assets are not included in the repository because they can cause the repo to bloat, and are also not release under the same license as the code.

## Game store assets

Anything you put into the `static` folder in this repo will be served by the server. This is useful for storing assets for the game store. For example, you can put a `static/images/store` folder and then reference the images in the store using `/images/store/my-image.png`. For instance, you can use the store assets made available in the [canary docs](https://docs.opentibiabr.com/others/downloads/website-applications/applications#store-for-client-13)

## Showcase

## Tech stack

- [Svelte](https://svelte.dev/)
- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [SkeletonCSS](https://skeleton.dev)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [PNPM](https://pnpm.io/)

## Contributing

Contributions are welcome! Please open an issue or pull request. Be sure to post screenshots and logs of any issues you're having.

## License

MIT
