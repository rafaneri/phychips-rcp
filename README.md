[![Build Status](https://travis-ci.org/rafaneri/phychips-rcp.svg?branch=master)](https://travis-ci.org/rafaneri/phychips-rcp)
[![Coverage Status](https://coveralls.io/repos/github/rafaneri/phychips-rcp/badge.svg?branch=master)](https://coveralls.io/github/rafaneri/phychips-rcp?branch=master)

# RFID-rcp
Reader Control Protocol to RFID with Phychips PR9200 or VANCH

## Installation 
```sh
npm install phychips-rcp --save
yarn add phychips-rcp
bower install phychips-rcp --save
```
## Usage
### Javascript
```javascript
var RCP = require('phychips-rcp');
var startAutoRead2Cmd = RCP.startAutoRead2();
```
```sh
startAutoRead2Cmd should be 'BB0036000502000000007E220D'
```
### TypeScript
```typescript
import { RCP } from 'phychips-rcp';
let startAutoRead2Cmd = RCP.startAutoRead2()
```
```sh
startAutoRead2Cmd should be 'BB0036000502000000007E220D'
```
## Test 
```sh
npm run test
```
