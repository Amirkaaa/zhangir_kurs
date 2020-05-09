import express from 'express';

import authorization from './authorization/authorization.router.mjs';
import center from './center/center.router.mjs';
import cheating from './cheating/cheating.router.mjs';
import city from './city/city.router.mjs';
import exam from './exam/exam.router.mjs';
// import registration from './registration/registration.router.mjs';
import report from './report/report.router.mjs';
import type from './type/type.router.mjs';
import user from './user/user.router.mjs';

const router = express.Router();

router.use('/authorization', authorization);
// router.use('/center', center);
// router.use('/cheating', cheating);
// router.use('/city', city);
// router.use('/registration', registration);
// router.use('/report', report);
// router.use('/type', type);
// router.use('/exam', exam);
router.use('/user', user);

export default router;