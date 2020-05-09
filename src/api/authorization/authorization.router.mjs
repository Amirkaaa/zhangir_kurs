import express from 'express';

import LoginMiddleware from './middlewares/login.mjs';

import TokenMiddleware from './middlewares/token.mjs';
import AuthorizationController from './authorization.controller.mjs';

const router = express.Router();

router.get('/profile', [
    TokenMiddleware,
    AuthorizationController.profile
]);

router.post('/login', [
    LoginMiddleware,
    AuthorizationController.login
]);

export default router;