import crypto from 'crypto';


export default (hash, password) => {
    let [salt, pass] = hash.split('$');
    return pass === crypto.createHmac('sha512', salt).update(password).digest('base64');
}