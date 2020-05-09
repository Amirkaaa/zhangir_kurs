import mongoose from 'mongoose';
import mongoModelOptions from '../../../mongo/model.mjs';


export default new class AnswerModel {
    constructor() {
        const modelName = 'answer';
        const modelOptions = mongoModelOptions(modelName);
        const modelSchema = new mongoose.Schema({
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'question'
            },
            answer: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'option'
            }],
            correct: {
                type: Boolean,
                default: false
            },
            points: {
                type: Number,
                min: 0,
                default: 0,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
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