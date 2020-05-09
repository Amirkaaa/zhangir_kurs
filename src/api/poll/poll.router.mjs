import express from 'express';

import PollController from './poll.controller.mjs';
import TokenMiddleware from '../authorization/middlewares/token.mjs';
import PermissionMiddleware from '../authorization/middlewares/permission.mjs';


const router = express.Router();

const PollInsertPermission = (req, res, next) => PermissionMiddleware(req, res, next, ['admin']);
const PollPatchPermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);
const PollDeletePermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);

router.route('/')
    .all([])

    .post([
        TokenMiddleware,
        PollInsertPermission,
        PollController.insert
    ])

    .get([
        PollController.list
    ]);

router.route('/:_id')
    .all([])

    .get([
        PollController.retrieve
    ])

    .patch([
        TokenMiddleware,
        PollPatchPermission,
        PollController.patch
    ])

    .delete([
        TokenMiddleware,
        PollDeletePermission,
        PollController.remove
    ]);

export default router;