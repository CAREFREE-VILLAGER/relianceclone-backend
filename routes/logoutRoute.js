
const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('session_id');
        res.status(200).json({ message: 'Logout successful' });
    });
});

module.exports = router;