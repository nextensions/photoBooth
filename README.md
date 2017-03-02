## Environment
- **Must install WebCard plugin !!**
- **Support browser ```firefox``` only !!**
- Support webcam
- Support smartcard reader (Thai national ID card)
- use tracking.js
- use canvas
- React

## Config firefox
1. go to firefox typing address ```about:config```
2. Search : ```media.navigator.permission.disabled```
3. change to ```true```

## Installation Server
- Web
```
yarn
```
- API Server
```
cd server
yarn
```

## Installation WebCard Plugin
- OSX install ```plugin/webcard.dmg```
- Windows install ```plugin/webcard.msi``` <br>
*** ref: https://github.com/cardid/WebCard ***

## Run
- Client Link ```localhost:3000```
```
npm start
```

- Server Link ```localhost:3030```
```
cd server
npm start
```
or
```
node server/index.js
```
