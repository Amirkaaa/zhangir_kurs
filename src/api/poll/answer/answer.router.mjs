import express from 'express';

import AnswerController from './answer.controller.mjs';
import TokenMiddleware from '../../authorization/middlewares/token.mjs';
import PermissionMiddleware from '../../authorization/middlewares/permission.mjs';


const router = express.Router();

const AnswerInsertPermission = (req, res, next) => PermissionMiddleware(req, res, next, ['admin']);
const AnswerPatchPermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);
const AnswerDeletePermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);

router.route('/')
    .all([])

    .post([
        TokenMiddleware,
        AnswerInsertPermission,
        AnswerController.insert
    ])

    .get([
        AnswerController.list
    ]);

router.route('/:_id')
    .all([])

    .get([
        AnswerController.retrieve
    ])

    .patch([
        TokenMiddleware,
        AnswerPatchPermission,
        AnswerController.patch
    ])

    .delete([
        TokenMiddleware,
        AnswerDeletePermission,
        AnswerController.remove
    ]);

export default router;