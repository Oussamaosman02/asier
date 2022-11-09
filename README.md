# next-pwa and web-push with mongo example

This is an example of functional PWA for team work and planing things.

**NOTE**
Is focussed on a class management as it has exams and homework but it can be changed in a simple way.

## Usage

Clone this repo or dowanload it.

Then, go to this repo locally:

```bash
cd asier
npm install
npm run vapid > vapid.txt
```

Create a `.env` file, and put the public key, private key generated from the previous step
Also add a mongoDB secure url to this `.env` file and the DATA_URL will include your page url, it can be localhost:3000

Other things to add to this file is REGISTRAR, for allowing or not to register new admin users,PASSWORD for the autentication password for regular users
```
WEB_PUSH_EMAIL=user@example.com
WEB_PUSH_PRIVATE_KEY=<vapid-private-key>
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=<vapid-public-key>
MONGO_URI=<mongo-url>
DATA_URL=<page-url>
REGISTRAR=<si|no>
PASSWORD=<some-password>
```

Build and start

```bash
npm run build
npm run start
```

## Recommend `.gitignore`

```
**/public/workbox-*.js
**/public/sw.js
**/public/worker-*.js
.env
vapid.txt
```
