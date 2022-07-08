The sample code of OpenID Connect client and provider.

## Run

    npm install

    # Activate ngrok beforehand
    ngrok http 6000
    
    # Set ngrok generated url to ISSUER
    PORT=6000 CLIENT_PORT=6001 ISSUER=https://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io CLIENT_URI=http://localhost:6001 npm run start

    # To start with mongo (mongodb needs to be started)
    MONGODB_URI=mongodb://localhost:27017/oidc_lab

    # Open client
    open http://localhost:6001/

## curl request sample

### /me

    $ curl -H 'Authorization: Bearer wa8AgWxDvN2kBOwTte9UkE3rnUQmI8m9TSXS2Yzq6ld' http://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io/me
    {"sub":"aaaa"}

### /token/introspection

    curl -X POST -d 'token=wa8AgWxDvN2kBOwTte9UkE3rnUQmI8m9TSXS2Yzq6ld' -H 'Authorization: Basic Y2xpZW50X2lkX3NhbXBsZTpjbGllbnRfc2VjcmV0X3NhbXBsZQ==' http://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io/token/introspection
    {"active":true,"sub":"aaaa","client_id":"client_id_sample","exp":1657117278,"iat":1657113678,"iss":"http://079f-2001-ce8-106-e62a-c1c3-c37-4ce5-ff9b.ngrok.io","scope":"openid","token_type":"Bearer"}

## References

- https://github.com/panva/node-oidc-provider/tree/main/example
- https://github.com/moomoo-ya/oidc-client-sample