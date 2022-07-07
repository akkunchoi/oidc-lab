import express from 'express';
import { Issuer, Strategy, TokenSet } from 'openid-client';
import path from 'path';
require('ejs');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

passport.serializeUser(function(user, done) {
  console.log('secializeUser', user)
  // セッション情報にはIDなど最低限のみ保存する
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log('desecializeUser', id)
  // 実際にはここでセッションにもつIDからユーザ情報を取得する
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  done(null, id);
});

(async () => {
  // HACK: providerより先に起動しないように、少し待つ
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // express settings
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));


  // oidc client settings
  const { PORT = 3000, CLIENT_PORT = 3001, ISSUER = `http://localhost:${PORT}`, CLIENT_URI = `http://localhost:${CLIENT_PORT}`} = process.env;
  const issuer = await Issuer.discover(ISSUER);
  console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);

  const redirecturis = [CLIENT_URI + '/auth/cb'];
  const client = new issuer.Client({
    client_id: 'client_id_sample',
    client_secret: 'client_secret_sample',
    redirect_uris: redirecturis,
    response_types: ['code'],
    // id_token_signed_response_alg (default "RS256")
    // token_endpoint_auth_method (default "client_secret_basic")
  }); // => Client  

  const params = {
    redirect_uri: redirecturis[0]
  };

  // passport settings
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use('oidc', new Strategy({ client, params }, (tokenset: TokenSet, userinfo, done) => {
    console.log('tokenset', tokenset);
    console.log('access_token', tokenset.access_token);
    console.log('id_token', tokenset.id_token);
    console.log('claims', tokenset.claims());
    console.log('userinfo', userinfo);

    return done(null, userinfo);

    // // この部分をユーザ検索して有無チェックする
    // if (tokenset.claims.sub !== 'a') {
    //   return done(null);
    // }
    // return done(null, tokenset.claims.sub);
  }));

  // router settings
  app.get('/', (req: express.Request, res: express.Response) => {
    console.log('user', (req as any).user);
    res.render('index', { user: (req as any).user })
  })
  app.get('/logout', (req: express.Request, res: express.Response) => {
    (req as any).logout(() => {
      res.redirect('/');
    });
  })
  
  app.get('/auth', passport.authenticate('oidc'));
  app.get('/auth/cb', passport.authenticate('oidc', {
    successRedirect: '/',
    failureRedirect: '/?login_failure',
    session: true,
  }));

  const server = app.listen(CLIENT_PORT, () => {
    console.log(`client is listening on port ${CLIENT_PORT}`);
  });

})();
