import OptionModel from './option.model.mjs';
import errors from '../../../mongo/errors.mjs';
import querify from '../../../utils/querify.mjs';


export default new class OptionController {
    insert(req, res) {
        OptionModel
            .insert(req.body)
            .then(result => res.status(201).json(result))
            .catch(err => errors.validations.includes(err.name) ? res.status(400).json(err) : res.status(500).json(err));
    }

    list(req, res) {
        const {querystring, sort} = querify(req.query);

        OptionModel
            .list(querystring, sort)
            .then(result => res.status(200).json(result))
            .catch(err => errors.validations.includes(err.name) ? res.status(400).json(err) : res.status(500).json(err));
    }

    retrieve(req, res) {
        OptionModel
            .retrieve(req.params)
            .then(result => result ? res.status(200).json(result) : res.status(404).send())
            .catch(err => errors.validations.includes(err.name) ? res.status(400).json(err) : res.status(500).json(err));
    }

    patch(req, res) {
        OptionModel
            .patch(req.params, req.body)
            .then(result => result ? res.status(200).json(result) : res.status(404).send())
            .catch(err => errors.validations.includes(err.name) ? res.status(400).json(err) : res.status(500).json(err));
    }

    remove(req, res) {
        OptionModel
            .remove(req.params)
            .then(result => result ? res.status(204).send() : res.status(404).send())
            .catch(err => errors.validations.includes(err.name) ? res.status(400).json(err) : res.status(500).json(err));
    }
}
