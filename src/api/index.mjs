import express from 'express';

import authorization from './authorization/authorization.router.mjs';
import quiz from './quiz/quiz.router.mjs';
import answer from './quiz/answer/answer.router.mjs';
import option from './quiz/option/option.router.mjs';
import question from './quiz/question/question.router.mjs';
import user from './user/user.router.mjs';

const router = express.Router();

router.use('/authorization', authorization);

router.use('/quiz', quiz);
router.use('/answer', answer);
router.use('/option', option);
router.use('/question', question);

router.use('/user', user);

export default router;