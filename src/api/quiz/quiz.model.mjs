import mongoose from 'mongoose';
import mongoModelOptions from '../../mongo/model.mjs';


export default new class QuizModel {
    constructor() {
        const modelName = 'quiz';
        const modelOptions = mongoModelOptions(modelName);
        const modelSchema = new mongoose.Schema({
            text: {
                type: String,
                trim: true,
                required: true,
                maxlength: 24
            },
            questions: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'question'
            }]
        }, modelOptions);

        this.model = mongoose.model(modelName, modelSchema);
    }

    insert(data) {
        return new this.model(data).save();
    }

    list(querystring = {}, sort = {}) {
        return this.model.find(querystring).sort(sort).populate({
            path: 'questions',
            populate: {
                path: 'options',
                model: 'option'
            }
        }).exec();
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