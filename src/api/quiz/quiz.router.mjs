import express from 'express';

import QuizController from './quiz.controller.mjs';
import TokenMiddleware from '../authorization/middlewares/token.mjs';
import PermissionMiddleware from '../authorization/middlewares/permission.mjs';


const router = express.Router();

const QuizInsertPermission = (req, res, next) => PermissionMiddleware(req, res, next, ['admin']);
const QuizPatchPermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);
const QuizDeletePermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);

router.route('/')
    .all([])

    .post([
        TokenMiddleware,
        QuizInsertPermission,
        QuizController.insert
    ])

    .get([
        QuizController.list
    ]);

router.route('/:_id')
    .all([])

    .get([
        QuizController.retrieve
    ])

    .patch([
        TokenMiddleware,
        QuizPatchPermission,
        QuizController.patch
    ])

    .delete([
        TokenMiddleware,
        QuizDeletePermission,
        QuizController.remove
    ]);

export default router;