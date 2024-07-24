/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@assets'] = path.join(__dirname, 'public/assets');
    config.resolve.alias['@icons'] = path.join(__dirname, 'public/icons');
    config.resolve.alias['@fonts'] = path.join(__dirname, 'public/fonts');
    config.resolve.alias['@models'] = path.join(__dirname, 'public/models');
    config.resolve.alias['@sounds'] = path.join(__dirname, 'public/sounds');
    return config;
  },

  images: {
    domains: ['img.clerk.com'],
  },
 
};
