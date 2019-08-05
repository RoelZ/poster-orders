'use strict'

const WooCommerceAPI = require('woocommerce-api'),
      WooCommerce = new WooCommerceAPI({
        url: 'https://placethemoment.com', 
        consumerKey: '',
        consumerSecret: '',
        wpAPI: true,
        version: 'wc/v3'
      });

module.exports = WooCommerce;