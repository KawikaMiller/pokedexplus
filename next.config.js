/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'archives.bulbagarden.net',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'pokeapi.co',
        port: ''
      }
    ]
  }
}
module.exports = nextConfig
