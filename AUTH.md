Usually, if you use JWTs to secure an API, you should be using at least two. One called an access token, which is short lived. This token is stateless, thus needs no storage on the backend (no white or blacklisting). These tokens are quite short lived (at most a minute to a few or so), because you can't revoke one, without revoking them all. So, if you need to log one person out via access tokens, you have to log everyone out. Not good. Access tokens can be stored either in httpOnly cookies or in memory and sent via the request header (the common way most people say to send them). 

Then the other token is called a refresh or session token. This token is longer lived and is usually whitelisted, i.e. stored in a database/ cache. These tokens, because they are stored in a database, can be individually revoked, thus why they are called a session token too. 

The process is the following. The user logs in and receives both an access and a refresh token. All calls to the API are sent with the access token. If the access token is invalid for any reason, then the client sends an additional request to a specific URI path to check on the user's session. The session token is stored and sent only as an httpOnly cookie. The session token is checked, and if valid, a new session and access token is sent to the client and the process begins again. 

Depending on your security needs, this is "ok". It's not 100% failsafe, because the tokens are being transmitted and the access tokens are in memory of the client app. To be failsafe, tokens shouldn't be stored in the browser at all. This, however, takes plumbing on the server side and you end up with basically a regular session system towards the client.
In other words, if you don't need to offer some sort of third party login process like with Github, Google or Facebook, then you don't need and probably shouldn't use tokens. This is a good article on the subject. 
https://medium.com/@benjamin.botto/secure-access-token-storage-with-single-page-applications-part-1-9536b0021321

Sessions article
https://dev.to/nestjs/setting-up-sessions-with-nestjs-passport-and-redis-210
