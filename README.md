## 起動

    ngrok http 6000
    # ISSUERはngrokで生成されたURLに変更する
    PORT=6000 CLIENT_PORT=6001 ISSUER=https://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io CLIENT_URI=http://localhost:6001 npm run start

    # mongoで起動する場合（別途mongodbが必要）ｆ
    MONGODB_URI=mongodb://localhost:27017/oidc_lab
