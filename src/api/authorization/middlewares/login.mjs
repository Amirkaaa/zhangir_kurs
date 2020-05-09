import UserModel from '../../user/user.model.mjs';
import login from '../utils/login.mjs';

export default async (req, res, next) => {
    const error = {errors: ['username or password fields are invalid']};

    UserModel
        .retrieve({email: req.body.email})
        .then(user => user && login(user.password, req.body.password) ? next() : res.status(400).json(error))
        .catch(err => res.status(500).json(err));
}