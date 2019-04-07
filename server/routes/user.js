const { Router } = require('express');
const router = Router();

const sha1 = require('sha1');
const { getCollection } = require('../db');

const users = getCollection('user');

router.get('/user/register', (ret, res) => {
    res.json({
        message: 'hello',
    });
});

router.post('/user/register', async ({ body: { username, passcode } }, response) => {
    const registerUser = {
        _key: sha1(username),
        username,
        passcode,
    };

    const result = await users.save(registerUser);
    console.log(result);

    response.json({
       success: true,
    });
});

module.exports = router;
