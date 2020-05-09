import crypto from 'crypto';


export default () => {
    return crypto.randomBytes(64).toString('hex');
}