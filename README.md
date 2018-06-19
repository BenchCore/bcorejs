# bCoreJS

BenchCore's Javascript Library For Sending BEX and other BenchCore Root and SideChain Asset-Based Transactions. It can be used from the client as a [browserify](http://browserify.org/) compiled module, or on the server as a standard Node.js module.


## Table of Contents

- [Background](#background)
- [Installation](#installation)
- [Web Build](#web-build)
- [Usage](#usage)
  - [Generating A KeyPair](#generating-a-keypair)
  - [Generating An Address](#generating-an-address)
  - [Generating A Transaction](#generating-a-transaction)
  - [Network Identification With Nethash](#network-identification-with-nethash)
  - [Posting A Transaction](#posting-a-transaction)
  - [Sending Transaction On A Client](#sending-transactions-on-a-client)
  - [Sending Transaction On A Server](#sending-transactions-on-a-server)
  - [Peer Response](#peer-response)
  - [Other Transaction Types](#other-transaction-types)
- [Libraries](#libraries)
- [Resources](#resources)
- [Why Decentralized Internet](#why-the-internet-must-have-a-decentralized-alternative)
- [Bench On The dWeb](#bench-on-the-dweb)
- [License](#license)
- [Copyright](#license)

## Background
bCoreJS was built from Ark's original javascript library [ark-js](https://github.com/ArkEcosystem/ark-js), which derived from [Lisk](https://lisk.io) and was originally known as **liskJS**.

## Installation

### Install With NPM
```
npm install @benchcore/bcorejs
```
### Install With YARN
```
yarn add @benchcore/bcorejs
```

## Web Build

Build the browserify module for client use:

```sh
npm build:browserify
```

Clean:

```sh
npm clean:browserify
```

## Tests

```
npm test
```

Tests written using mocha + schedule.js.

***

## Usage

On the client:

```html
<script src="node_modules/bcorejs/bundle.min.js"></script>
```

On the server:

```js
var bench = require("bcorejs");
```

### Generating a key pair

To generate a public / private key pair from a given passphrase:

```js
var keys = bench.crypto.getKeys("passphrase");
```

Returning:

```js
{
  publicKey: "02e012f0a7cac12a74bdc17d844cbc9f637177b470019c32a53cef94c7a56e2ea9",
  privateKey: ""
}
```

To get the private key:

```js
keys.d.toBuffer().toString("hex");
```

Returning:
```
1e089e3c5323ad80a90767bdd5907297b4138163f027097fd3bdbeab528d2d68
```


### Generating an address

To generate a unique Ark address from a given public key:

```js
var address = bench.crypto.getAddress("5d036a858ce89f844491762eb89e2bfbd50a4a0a0da658e4b2628b25b117ae09");
```

Returning:

```
AGihocTkwDygiFvmg6aG8jThYTic47GzU9
```

### Creating a transaction

To create a signed transaction object, which can then be broadcasted onto the network:

```js
var amount      = 1000 * Math.pow(10, 8); // 100000000000
var transaction = bench.transaction.createTransaction("AGihocTkwDygiFvmg6aG8jThYTic47GzU9", amount, null, "passphrase", "secondPassphrase");
```

Returning:

```js
{
  type: 0, // Transaction type. 0 = Normal transaction.
  amount: 100000000000, // The amount to send expressed as an integer value.
  asset: {}, // Transaction asset, dependent on tx type.
  fee: 100000000, // 0.1 ARK expressed as an integer value.
  id: "500224999259823996", // Transaction ID.
  recipientId: "BPznHFjiWBVXgW51ojD1wKBhucSryidzgz", // Recipient ID.
  senderPublicKey: "03c60519bf6a704949b80e25a5e1a68fddd008ae23ea5728ec8f36c0bb003357a3", // Sender's public key.
  signSignature: "03fdd33bed30270b97e77ada44764cc8628f6ad3bbd84718571695262a5a18baa37bd76a62dd25bc21beacd61eaf2c63af0cf34edb0d191d225f4974cd3aa509", // Sender's second passphrase signature.
  signature: "9419ca3cf11ed2e3fa4c63bc9a4dc18b5001648e74522bc0f22bda46a188e462da4785e5c71a43cfc0486af08d447b9340ba8b93258c4c7f50798060fff2d709", // Transaction signature.
  timestamp: 27953413 // Based on UTC time of genesis since epoch.
}
```

### Network identification with Nethash

You need to obtain the nethash in order to be sure you are broadcasting to the right network (testnet, mainnet or others). The nethash is simply the payload hash from the genesisBlock. If no nethash or wrong nethash is provided in the headers, the request will be rejected returning the expected nethash.

```json
{ "success": false, "message": "Request is made on the wrong network", "expected":"e2f8f69ec6ab4b12550a314bd867c46e64e429961bb427514a3a534c602ff467", "received":"wrong-nethash" }
```

The nethash for a given network can be obtained at the following API endpoint:

```
/api/blocks/getNetHash
```

You can also get the nethash from a peer this way:

On the client using [jQuery](https://jquery.com/):

```js
var nethash;
$.ajax({
  url: "https://michaelx.bex.life/peer/transactions/",
  data: JSON.stringify({}),
  dataType: "json",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "os": "linux3.2.0-4-amd64",
    "version": "0.3.0",
    "port": 1,
    "nethash": "wrong-nethash"
  },
  success: function(data) {
    nethash = data.body.expected;
  }
});
```

From a server using [Request](https://github.com/request/request):

```js
var nethash;
request({
  url: "https://michaelx.bex.life/peer/transactions",
  json: { },
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "os": "linux3.2.0-4-amd64",
    "version": "0.3.0",
    "port": 1,
    "nethash": "wrong-nethash"
  }
}, function(error, response, body) {
    nethash = body.expected;
  });
```

### Posting a transaction

Transaction objects are sent to `/peer/transactions`, using the `POST` method.

Example:

```js
Method: POST
Content-Type: application/json

{
    "transactions" : [{
        ...
    }]
}
```

#### Sending Transactions On A Client

Using [jQuery](https://jquery.com/):

```js
var success = function(data) {
  console.log(data);
};

$.ajax({
  url: "https://michaelx.bex.life/peer/transactions",
  data: JSON.stringify({ transactions: [transaction] }),
  dataType: "json",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "os": "linux3.2.0-4-amd64",
    "version": "0.3.0",
    "port": 1,
    "nethash":nethash
  },
  success: success
});
```

#### Sending Transactions On A Server

Using [Request](https://github.com/request/request):


```js
var request = require("request");

var callback = function(error, response, body) {
  console.log(error || body);
};

request({
  url: "https://michaelx.bex.life/peer/transactions",
  json: { transactions: [transaction] },
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "os": "linux3.2.0-4-amd64",
    "version": "0.3.0",
    "port": 1,
    "nethash": nethash
  }
}, callback);
```

#### Peer Response

Upon successfully accepting a transaction, the receiving node will respond with:

```json
{ "success": true, "result": "5318121831703437738" }
```

If the transaction is deemed invalid, or an error is encountered, the receiving node will respond with:

```json
{ "success": false, "message": "Error message" }
```

***

### Other transaction types

#### Creating a delegate transaction

```js
var transaction = bench.delegate.createDelegate("secret", "username", "secondSecret");
```

#### Creating a second signature transaction

```js
var transaction = bench.signature.createTransaction("secret", "secondSecret");
```

#### Creating a vote transaction

```js
var transaction = bench.vote.createVote("secret", ["+58199578191950019299181920120128129"], "secondSecret");
```

## Libraries
- [benchJS](https://github.com/benchcore/bcorejs) - Javascript Library For BenchCore RootChains and SideChains
- [benchcore-explorer](https://github.com/benchcore/benchcore-explorer) - Vue.js-based Explorer For BenchCore RootChains and SideChains
- [benchCLI](https://github.com/benchcore/benchcli) - Javascript Command CLI For BenchCore RootChains and SideChains
- [benchcore-v1](https://github.com/benchcore/benchcore-v1) - BenchCore V1 MultiChain Core
- [benchcore](https://github.com/benchcore/benchcore) - BenchCore V2 MultiChain Modular Core
- [bench-paper](https://github.com/benchcore/bench-paper) - BenchCore (BEX) Paper Wallet Generator via [https://paper.benchcore.io](https://paper.benchcore.io)
- [benchwallet](https://github.com/benchcore/benchwallet) - BenchCore MultiChain Wallet For Desktops (Mac, Linux and Windows)
- [benchwallet-mobile](https://github.com/benchcore/benchwallet-mobile) - BenchCore MultiChain Wallet For Mobile Phones (Android/iOS)
- [benchcore-launcher](https://github.com/benchcore/benchcore-launcher) - BenchCore V2 MultiChain Modular Core Easy Deployment Script
- [benchcore-web-wallet](https://github.com/benchcore/benchcore-web-wallet) - BenchCore Web Wallet via [https://wallet.benchcore.io](https://wallet.benchcore.io)

## Resources
- [BenchCore Website](https://benchcore.io) - Official BenchCore Website
- [BenchCore API V1 Docs](https://api.benchcore.io/v1/) - Official BenchCore API V1 Documentation
- [BenchCore API V2 Docs](https://api.benchcore.io/v2/) - Official BenchCore API V2 Documentation
- [BenchCore Guide](https://docs.benchcore.io) - Official BenchCore Documentation
- [BenchCore Support](https://help.benchcore.io) - Official BenchCore Support Site
- [BenchCore Community](https://community.benchcore.io) - Official BenchCore Community Forums
- [BenchCore Developers Chat](https://chat.benchcore.io) - Official BenchCore Developer Chat (This is not a community chat.)
- [BenchCore Installation Guide](https://docs.benchcore.io/install) - Official Installation Guide For BenchCore V1 and V2


## Why The Internet Must Have A Decentralized Alternative
Today, the internet is more censored than ever and it's only getting worse. Our mission with the [dWeb Protocol](https://github.com/distributedweb/dweb) was to create a truly powerful P2P protocol, around [benOS](https://github.com/benchOS/benos), [dBrowser](https://github.com/benchOS/dbrowser) and many of benOS' underlying libraries to bring the most powerful P2P products to life. In the last few months, by rebuilding P2P technologies that have existed since the early 2000s, we have built a powerful suite of decentralized libraries for benOS and the Bench Network, that will only improve over time. But we also brought new ideas to life, like:

- [dDrive](https://github.com/distributedweb/ddrive)
- [dExplorer](https://github.com/distributedweb/dexplorer)
- [dDatabase](https://github.com/distributedweb/ddatabase)
- [dSites](https://github.com/distributedweb/dsites)
- [dPack](https://github.com/distributedweb/dpack)
- [benFS](https://github.com/benchOS/benfs)
- [DCDN](https://github.com/distributedweb/dcdn)
- [Rocketainer](https://github.com/distributedweb/rocketainer)
- [RocketOS](https://github.com/distributedweb/rocketos)
- [dNames](https://github.com/distributedweb/dnames)
- [P2PDNS](https://github.com/distributedweb/p2pdns)
- [dWebFS](https://github.com/distributedweb/dwebfs)
- [dWebDB](https://github.com/distributedweb/dwebdb)
- [MeteorIDE](https://github.com/distributedweb/meteorIDE)
- [Kepler](https://github.com/benchlab/kepler)
- [Neutron](https://github.com/benchlab/neutron)
- [Designate](https://github.com/benchlab/designate)
- [Nova](https://github.com/benchlab/nova)

and more! These were the protocols and libraries that we needed to create a completely decentralized operating system, where everything was distributed, protected and people were once again in control of their data. benOS is made up of over 1100+ different libraries that we are releasing on a day-by-day basis as we move them to a stable/production state. While financial support is great for this open source project, we need developers who want to be some of the first to build the `dApps` and `dSites` of the future. We have to take back what our forefathers originally designed for freedom, by making our code the law, instead of releasing weak and highly centralized applications where law cannot be applied because the code lacks the foundation to implement a legal framework for itself. Join us for a truly historic journey on the [BenchLabs Telegram](https://t.me/benchlabs). See you there.

### Bench On The dWeb
[dweb://bench.dnames.io](dweb://bench.dnames.io) // dNames Short Link
[dweb://3EDAE09848B77401445B7739CAFCE442DDE1752AED63025A1F94E6A86D7E9F04](dweb://3EDAE09848B77401445B7739CAFCE442DDE1752AED63025A1F94E6A86D7E9F04) // dWeb Key Link

In order to make the links above clickable or to view these links period, you will need [dBrowser](https://github.com/benchOS/dbrowser) (Available for Mac OSX, Linux, Windows and soon to be available on iOS/Android)

#### "The Code Is The Law" - Stan Larimer - Godfather of BitShares.

## License
[MIT](LICENSE.md)
<br><br>
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
<br>
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://js.benchcore.io)
<br>
[![dWebShield](https://github.com/benchlab/dweb-shields/blob/master/shields/dweb-protocol-shield.svg)](https://dwebs.io)

## Copyright
Copyright (c) 2018 Distributed Webs Project. All rights reserved.
