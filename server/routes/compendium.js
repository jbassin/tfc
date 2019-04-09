const { Router } = require('express');
const router = Router();
const { getCollection } = require('../db');

const compendium = getCollection('compendium');

router.post('/api/compendium/get', async ({ body: { title } }, res) => {
    const entries = await compendium.lookupByKeys([title]);
    if (entries.length < 1) {
        res.json({
            success: false,
            entry: {}   ,
        });
    } else {
        res.json({
            success: true,
            entry: {
                author: entries[0].author,
                text: entries[0].text,
            },
        });
    }
});

module.exports = router;
