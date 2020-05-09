import UserModel from '../../user/user.model.mjs';

export default (req, res, next) => {
    const header = req.headers['authorization'];

    if (header === undefined) {
        return res.status(401).send();
    }

    const token = header.split(' ')[1];

    if (token === undefined) {
        return res.status(401).send();
    }

    UserModel
        .retrieve({token})
        .then(result => result ? (res.locals.user = result) && next() : res.status(401).send())
        .catch(err => res.status(500).json(err));
}