/** @module networks */

module.exports = {
  /** @type {Network} */
  bench: {
    messagePrefix: '\x18BEX Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 25, // Addresses will begin with 'A'
    wif: 0xba // Network prefix for wif generation
  },
  /** @type {Network} */
  benchtest: {
    messagePrefix: '\x18TEX Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x04358394
    },
    pubKeyHash: 65, // Addresses will begin with 'a'
    wif: 0xba // Network prefix for wif generation
  },
  /** @type {Network} */
  bitcoin: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 0x00,
    wif: 0x80
  },
  /** @type {Network} */
  bpnet: {
    messagePrefix: '\x18BEN Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 25,
    wif: 0xba
  },
  bptest: {
    messagePrefix: '\x18BENTEST Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x04358394
    },
    pubKeyHash: 25,
    wif: 0xba
  },
  /** @type {Network} */
  muznet: {
    messagePrefix: '\x18MUZ Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 50,
    wif: 0xba
  },
  muztest: {
    messagePrefix: '\x18MUZTEST Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x04358394
    },
    pubKeyHash: 50,
    wif: 0xba
  },
  /** @type {Network} */
  shopnet: {
    messagePrefix: '\x18SHOP Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 63,
    wif: 0xba
  },
  /** @type {Network} */
  shoptest: {
    messagePrefix: '\x18SHOPTEST Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x04358394
    },
    pubKeyHash: 63,
    wif: 0xba
  },
  /** @type {Network} */
  sharenet: {
    messagePrefix: '\x18SHARE Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 63,
    wif: 0xba
  },
  /** @type {Network} */
  sharetest: {
    messagePrefix: '\x18SHARETEST Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x04358394
    },
    pubKeyHash: 63,
    wif: 0xba
  },
  /** @type {Network} */
  dannet: {
    messagePrefix: '\x18DAN Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 30,
    wif: 0xba
  },
  /** @type {Network} */
  dantest: {
    messagePrefix: '\x18DANTEST Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x04358394
    },
    pubKeyHash: 30,
    wif: 0xba
  },
  /** @type {Network} */
  vidnet: {
    messagePrefix: '\x18VID Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 70,
    wif: 0xba
  },
  /** @type {Network} */
  vidtest: {
    messagePrefix: '\x18VIDTEST Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x04358394
    },
    pubKeyHash: 70,
    wif: 0xba
  },
  /** @type {Network} */
  devnet: {
    messagePrefix: '\x18DEX Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 30,
    wif: 0xba
  },
  ark: {
    messagePrefix: '\x18Ark Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    pubKeyHash: 0x17, // Addresses will begin with 'A'
    wif: 0xaa // Network prefix for wif generation
  },
}
