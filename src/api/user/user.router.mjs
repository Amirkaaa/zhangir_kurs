import express from 'express';

import UserController from './user.controller.mjs';
import TokenMiddleware from '../authorization/middlewares/token.mjs';
import PermissionMiddleware from '../authorization/middlewares/permission.mjs';


const router = express.Router();

const UserInsertPermission = (req, res, next) => PermissionMiddleware(req, res, next, ['admin']);
const UserPatchPermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin', 'user']);
const UserDeletePermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);

router.route('/')
    .all([
        TokenMiddleware
    ])

    .post([
        UserInsertPermission,
        UserController.insert
    ])

    .get([
        UserController.list
    ]);

router.route('/:_id')
    .all([
        TokenMiddleware
    ])

    .get([
        UserController.retrieve
    ])

    .patch([
        UserPatchPermission,
        UserController.patch
    ])

    .delete([
        UserDeletePermission,
        UserController.remove
    ]);

export default router;