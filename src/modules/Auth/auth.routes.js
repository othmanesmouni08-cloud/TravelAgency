const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('./auth.controller');
const { validateRegister, validateLogin, validateChangePassword } = require('./auth.validation');
const { authenticate } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');

// Public Local Routes
router.post('/register', validateRegister, validate, authController.register);
router.post('/login', validateLogin, validate, authController.login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    authController.oauthCallback
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: '/login' }),
    authController.oauthCallback
);

// Protected routes
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/logout', authenticate, authController.logout);
router.post('/change-password', authenticate, validateChangePassword, validate, authController.changePassword);

module.exports = router;
