const express = require('express');
const scanHolders = require('../scanHolders')
const router = express.Router();

router.get('/token_holders', async (req, res) => {
    const tick = req.query.tick
    if(!global.holderMap[tick]) {
        await scanHolders(tick);
    }
    return res.status(200).send(global.holderMap[tick]);
});

module.exports = router;