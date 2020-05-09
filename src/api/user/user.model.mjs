import mongoose from 'mongoose';

import token from '../authorization/utils/token.mjs';
import password from '../authorization/utils/password.mjs';
import mongoModelOptions from '../../mongo/model.mjs';


export default new class UserModel {
    constructor() {
        const modelName = 'user';
        const modelOptions = mongoModelOptions(modelName);
        const modelSchema = new mongoose.Schema({
            type: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            },
            email: {
                type: String,
                unique: true,
                trim: true,
                required: true,
                lowercase: true
            },
            username: {
                type: String,
                trim: true,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true,
                trim: true,
                min: 128,
                max: 128
            }
        }, modelOptions);

        modelSchema.pre('validate', function (next) {
            if (this.isNew) this.token = token();

            return next();
        });

        modelSchema.pre('save', function (next) {
            let modified = this.modifiedPaths();

            if (modified.includes('password')) this.password = password(this.password);

            return next()
        });

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
        if (update.password) update.password = password(update.password);

        return this.model.findOneAndUpdate(conditions, update, {new: true}).exec();
    }

    remove(conditions) {
        return this.model.findOneAndRemove(conditions).exec();
    }
}