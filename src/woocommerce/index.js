'use strict'

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

let WooCommerce = new WooCommerceRestApi({
  url: 'https://placethemoment.com', 
  consumerKey: '',
  consumerSecret: '',
  wpAPI: true,
  version: 'wc/v3'
});

module.exports = WooCommerce;