const { Database } = require('arangojs');
const db = new Database({
    url: 'http://iridium.duckdns.org:8529'
});
db.useDatabase('tfc');
db.useBasicAuth('root', 'SnDn1998!?');

const getCollection = function(dbName) {
    return db.collection(dbName);
};

module.exports = {
    Database: db,
    getCollection,
};
