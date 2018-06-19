/* global describe, it */

var assert = require('assert')
var bigi = require('bigi')
var bench = require('../../')

describe('bcorejs (basic)', function () {
  it('can generate a random bench address', function () {
    // for testing only
    function rng () { return new Buffer('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz') }

    // generate random keyPair
    var keyPair = bench.ECPair.makeRandom({ rng: rng })
    var address = keyPair.getAddress()

    assert.strictEqual(address, 'BBUZUStj9oYyf7xyk1zyVttZsib2dxSAau')
  })

  it('can generate an address from a SHA256 hash', function () {
    var hash = bench.crypto.sha256('correct horse battery staple')
    var d = bigi.fromBuffer(hash)

    var keyPair = new bench.ECPair(d)
    var address = keyPair.getAddress()

    assert.strictEqual(address, 'B4kNrzJx23qpeWd7DMT4FBHwAe1WV81xYj')
  })

  it('can generate a random keypair for alternative networks', function () {
    // for testing only
    function rng () { return new Buffer('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz') }

    var bitcoin = bench.networks.bitcoin

    var keyPair = bench.ECPair.makeRandom({ network: bitcoin, rng: rng })
    var wif = keyPair.toWIF()
    var address = keyPair.getAddress()

    assert.strictEqual(address, '182UrjSXQHy5DHUp8Xg1Nm5u979SojJY2P')
    assert.strictEqual(wif, 'L1Knwj9W3qK3qMKdTvmg3VfzUs3ij2LETTFhxza9LfD5dngnoLG1')
  })

  it('can import an address via WIF', function () {
    var keyPair = bench.ECPair.fromWIF('S9aCCSFvm8kNeyFb1t6pLb5oJs9tv96ag6uA8Du6UM7zsmsNHQiz')
    var address = keyPair.getAddress()

    assert.strictEqual(address, 'BR2vTcxsA3bweGFqYHaqat48aNEkiuZYs1')
  })

})
