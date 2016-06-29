var getBabelRelayPlugin = require('babel-relay-plugin');

var schemaData = require('./app/server/data/schema.json').data;

module.exports = getBabelRelayPlugin(schemaData);
