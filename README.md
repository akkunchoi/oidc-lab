## 起動

    ngrok http 6000
    # ISSUERはngrokで生成されたURLに変更する
    PORT=6000 CLIENT_PORT=6001 ISSUER=https://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io CLIENT_URI=http://localhost:6001 npm run start

    # mongoで起動する場合（別途mongodbが必要）ｆ
    MONGODB_URI=mongodb://localhost:27017/oidc_lab

## 検証サンプル

### /me

    $ curl -H 'Authorization: Bearer wa8AgWxDvN2kBOwTte9UkE3rnUQmI8m9TSXS2Yzq6ld' http://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io/me
    {"sub":"aaaa"}

### /token/introspection

    curl -X POST -d 'token=wa8AgWxDvN2kBOwTte9UkE3rnUQmI8m9TSXS2Yzq6ld' -H 'Authorization: Basic Y2xpZW50X2lkX3NhbXBsZTpjbGllbnRfc2VjcmV0X3NhbXBsZQ==' http://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io/token/introspection
    {"active":true,"sub":"aaaa","client_id":"client_id_sample","exp":1657117278,"iat":1657113678,"iss":"http://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io","scope":"openid","token_type":"Bearer"}
