
/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const { i18n } = require('./next-i18next.config')


/** eslint-disable @typescript-eslint/no-var-requires */
const withTM = require("next-transpile-modules")([
  "@solana/wallet-adapter-base",
  // Uncomment wallets you want to use
  // "@solana/wallet-adapter-bitpie",
  // "@solana/wallet-adapter-coin98",
  // "@solana/wallet-adapter-ledger",
  // "@solana/wallet-adapter-mathwallet",
  "@solana/wallet-adapter-phantom",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-solflare",
  "@solana/wallet-adapter-sollet",
  // "@solana/wallet-adapter-solong",
  // "@solana/wallet-adapter-torus",
  "@solana/wallet-adapter-wallets",
  // "@project-serum/sol-wallet-adapter",
  // "@solana/wallet-adapter-ant-design",
]);



const plugins = [
  // add this if you need LESS
  // [withLess, {
  //   lessLoaderOptions: {
  //     /* ... */
  //   },
  // }],
  [
    withTM,
    {
      webpack5: true,
      reactStrictMode: true,
      images: {
        domains: ['firebasestorage.googleapis.com', 'avatars.dicebear.com', 'raw.githubusercontent.com', 's2.coinmarketcap.com', 'images.unsplash.com', 'avatars.githubusercontent.com', 'relaxed-newton-b77a1a.netlify.app'],
      },
    },
  ],
];

const moduleExports = {
  i18n,
  async redirects() {
    return [
      {
        source: '/market',
        destination: '/',
        permanent: true,
      },
      {
        source: '/spot/:name',
        destination: '/',
        permanent: true,
      },
      {
        source: '/perp/:name',
        destination: '/',
        permanent: true,
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    config.module.rules.push({
      test: /\.svg?$/,
      oneOf: [
        {
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
      ],
    })
    return config
  },
}

module.exports = moduleExports
