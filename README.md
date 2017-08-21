# React Cognito Auth - (With new password required and reset password handling) 

A sample authentication app implemented with a server-less architecture, using Cognito User Pools, API Gateway, React and Redux.

This app used [Calm breeze login screen](https://codepen.io/Lewitje/pen/BNNJjo) design. Thanks!

Please see [here](https://github.com/ganezasan/serverless-cognito-auth) for how to make CognitoUserPools.

![example movie](https://raw.githubusercontent.com/ganezasan/react-cognito-auth/master/screen.png)

Note de Grégory
****************
+ Ajout de la gestion d'erreurs dans le cas où l'API Cognito renvoi un new password required 
+ Gestion de reset password (en cas de reset de l'admin ou en cas de forgot password) (juste pour une démo, ne pas utiliser en prod !)

## set .env
```
REACT_APP_USER_POOL_ID=xxxxx
REACT_APP_CLIENT_ID=xxxxx
REACT_APP_ENDPOINT=xxxxx
```

## install

Please create Cognito User Pool before start app.

```
npm install
npm start
```
