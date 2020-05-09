import UserModel from '../user/user.model.mjs';


export default new class UserController {
    profile(req, res) {
        return res.status(200).json(res.locals.user);
    }

    login(req, res) {
        UserModel
            .retrieve({email: req.body.email})
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err));
    }
}
