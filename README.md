## 起動

    ngrok http 6000
    # ISSUERはngrokで生成されたURLに変更する
    PORT=6000 CLIENT_PORT=6001 ISSUER=https://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io CLIENT_URI=http://localhost:6001 npm run start

## セットアップメモ

npm init -y 
npm install -D typescript
npm install -D @types/node
npm install -D ts-node
npx tsc --init
npm install express
npm install -D @types/express
