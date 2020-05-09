import mongoose from 'mongoose';
import mongoModelOptions from '../../mongo/model.mjs';


export default new class PollModel {
    constructor() {
        const modelName = 'poll';
        const modelOptions = mongoModelOptions(modelName);
        const modelSchema = new mongoose.Schema({
            name: {
                type: String,
                trim: true,
                required: true,
                maxlength: 24
            },
            issues: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'issue'
            }]
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