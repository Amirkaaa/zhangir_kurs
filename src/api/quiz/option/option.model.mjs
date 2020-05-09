import mongoose from 'mongoose';
import mongoModelOptions from '../../../mongo/model.mjs';


export default new class OptionModel {
    constructor() {
        const modelName = 'option';
        const modelOptions = mongoModelOptions(modelName);
        const modelSchema = new mongoose.Schema({
            text: {
                type: String,
                trim: true,
                required: true,
                maxlength: 24
            },
            correct: {
                type: Boolean,
                default: false
            }
        }, modelOptions);

        this.model = mongoose.model(modelName, modelSchema);
    }

    insert(data) {
        return new this.model(data).save();
    }

    list(querystring = {}, sort = {}) {
        return this.model.find(querystring).sort(sort).exec();
    }

    retrieve(querystring = {}) {
        return this.model.findOne(querystring).exec();
    }

    patch(conditions, update) {
        return this.model.findOneAndUpdate(conditions, update, {new: true}).exec();
    }

    remove(conditions) {
        return this.model.findOneAndRemove(conditions).exec();
    }
}