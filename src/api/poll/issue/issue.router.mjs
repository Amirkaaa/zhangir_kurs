import express from 'express';

import IssueController from './issue.controller.mjs';
import TokenMiddleware from '../../authorization/middlewares/token.mjs';
import PermissionMiddleware from '../../authorization/middlewares/permission.mjs';


const router = express.Router();

const IssueInsertPermission = (req, res, next) => PermissionMiddleware(req, res, next, ['admin']);
const IssuePatchPermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);
const IssueDeletePermission = (req, res, next) => PermissionMiddleware(res, res, next, ['admin']);

router.route('/')
    .all([])

    .post([
        TokenMiddleware,
        IssueInsertPermission,
        IssueController.insert
    ])

    .get([
        IssueController.list
    ]);

router.route('/:_id')
    .all([])

    .get([
        IssueController.retrieve
    ])

    .patch([
        TokenMiddleware,
        IssuePatchPermission,
        IssueController.patch
    ])

    .delete([
        TokenMiddleware,
        IssueDeletePermission,
        IssueController.remove
    ]);

export default router;