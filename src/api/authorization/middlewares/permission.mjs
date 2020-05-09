export default (req, res, next, allowed) => allowed.includes(res.locals.user.type) ? next() : res.status(403).send();
