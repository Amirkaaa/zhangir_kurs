import express from 'express';

import OptionController from './option.controller.mjs';
import TokenMiddleware from '../../authorization/middlewares/token.mjs';
import PermissionMiddleware from '../../authorization/middlewares/permission.mjs';


const router = express.Router();

const OptionInsertPermission = (req, res, next) => PermissionMiddleware(req, res, next, ['admin']);
const OptionPatchPermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);
const OptionDeletePermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);

router.route('/')
    .all([])

    .post([
        TokenMiddleware,
        OptionInsertPermission,
        OptionController.insert
    ])

    .get([
        OptionController.list
    ]);

router.route('/:_id')
    .all([])

    .get([
        OptionController.retrieve
    ])

    .patch([
        TokenMiddleware,
        OptionPatchPermission,
        OptionController.patch
    ])

    .delete([
        TokenMiddleware,
        OptionDeletePermission,
        OptionController.remove
    ]);

export default router;