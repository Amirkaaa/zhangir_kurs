import mongoose from 'mongoose';


const DB_NAME = 'zhangir';
const DB_PROTOCOL = 'mongodb://';
const DB_ADDRESS = '104.248.17.240:27017';
const DB_USER = 'zhangir';
const DB_PASS = 'reo8qsS6OYTmrFnT';

const DB_URL = `${DB_PROTOCOL}${DB_USER}:${DB_PASS}@${DB_ADDRESS}/${DB_NAME}`;

/**
 * For more information about mongoose options see here.
 * https://mongoosejs.com/docs/api.html
 */
const DB_OPTIONS = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

export default () => mongoose.connect(DB_URL, DB_OPTIONS);
