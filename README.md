## Environment
- **Must install WebCard plugin !!**
- **Support browser ```firefox``` only !!**
- Support webcam
- Support smartcard reader (Thai national ID card)
- use tracking.js
- use canvas
- React


## Installation WebCard Plugin
- Mac install ```plugin/webcard.dmg```
- Windows install ```plugin/webcard.msi``` <br>
*** ref: https://github.com/cardid/WebCard ***

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

## Run
- Web Link ```http://localhost:3000``` (first time only click ```Allow``` Smart Card Browser and ```Allow and Remember```)
```
npm start
```

- Server Link ```http://localhost:3030```
```
cd server
npm start
```
or
```
node server/index.js
```

## Build
```
npm run build
```

## Run Production (API and Web server)
```
node server.js
```

## Config firefox
### Setting Home Page
1. Press ```command + ,``` or Open ```preferences``` or Address ```about:preferences```
2. Home Page: ```http://localhost:3000```

### Setting auto sharing webcam
1. go to firefox typing address ```about:config```
2. Search : ```media.navigator.permission.disabled```
3. change to ```true```

### Setting auto allow Smart Card Browser Plugin
1. Installation WebCard Plugin
2. go to firefox typing address ```about:addons```
3. Plugins > Smart Card Browser Plugin > Change to ```Always Active```

### How to install full screen (R-kiosk)
1. open https://addons.mozilla.org/en-US/firefox/addon/r-kiosk/
2. install
3. restart firefox

### How to uninstall full screen (R-kiosk)
#### Mac
1. Close All firefox browser
2. Open terminal ```/Applications/Firefox.app/Contents/MacOS/firefox-bin -safe-mode```
3. Select ```Start in Safe Mode```
4. Press ```command + shift + A``` or Open ```Add-ons Manager```
5. find R-kiosk and click ```Disable``` or ```Remove```
6. Restart firefox

#### Windows
1. Close All firefox browser
2. Press ```Windows + R```
3. Typing  ```C:\Program Files\Mozilla Firefox\firefox.exe" -safe-mode``` (x64) or  ```C:\Program Files (x86)\Mozilla Firefox\firefox.exe" -safe-mode``` (x86)
4. Enter
5. Select ```Start in Safe Mode```
6. Press Open ```Add-ons Manager```
7. find R-kiosk and click ```Disable``` or ```Remove```
8. Restart firefox

| MacOS Command | Shortcut |
|---|---|---|---|---|
| Downloads |	command + J |
| Add-ons |	command + shift + A |
| Toggle Developer Tools | 	F12 or command + alt + I |
| Web | Console	command + alt + K |
| Inspector |	command + alt + C |
| Debugger |	command + alt + S |
| Style Editor | 	Shift + F7 |
| Profiler |	Shift + F5 |
| Network |	command + alt + Q |
| Developer Toolbar | 	Shift + F2 |
| Responsive Design View | 	command + alt + M |
| Scratchpad | Shift + F4 |
| Page Source | command + U |
| Browser Console | command + shift + J |
| Page Info | command + I |
