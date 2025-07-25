# sebportfolio
This is version 18 of React.

## Deploy to Cloudflare
change node version to fit cloudflare

npm install wrangler@latest 
create a .nvmrc folder with 20

## on cloudflare
create new PAGES not WORKERS
choose framework preset next.js
Build command: It should automatically become npx @cloudflare/next-on-pages
use version 2
runtime --> compatibility flags, nodejs_compat

## loading.js 
adds loader automatically 