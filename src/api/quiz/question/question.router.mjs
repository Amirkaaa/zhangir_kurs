import express from 'express';

import QuestionController from './question.controller.mjs';
import TokenMiddleware from '../../authorization/middlewares/token.mjs';
import PermissionMiddleware from '../../authorization/middlewares/permission.mjs';


const router = express.Router();

const QuestionInsertPermission = (req, res, next) => PermissionMiddleware(req, res, next, ['admin']);
const QuestionPatchPermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);
const QuestionDeletePermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);

router.route('/')
    .all([])

    .post([
        TokenMiddleware,
        QuestionInsertPermission,
        QuestionController.insert
    ])

    .get([
        QuestionController.list
    ]);

router.route('/:_id')
    .all([])

    .get([
        QuestionController.retrieve
    ])

    .patch([
        TokenMiddleware,
        QuestionPatchPermission,
        QuestionController.patch
    ])

    .delete([
        TokenMiddleware,
        QuestionDeletePermission,
        QuestionController.remove
    ]);

export default router;