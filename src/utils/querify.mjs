export default (querystring = {}) => {
    let sort = {};

    Object.keys(querystring).forEach(key => {
        let keys = key.split('.');

        if (keys.length >= 2) {
            let key_value = querystring[key];
            let key_field = keys.slice(1).join('.');

            if (keys[0] === 'gte') {
                querystring[key_field] = {'$gte': key_value, ...querystring[key_field]};
            }

            if (keys[0] === 'lte') {
                querystring[key_field] = {'$lte': key_value, ...querystring[key_field]};
            }

            if (keys[0] === 'search') {
                if (!querystring['$or']) querystring['$or'] = [];

                let search_field = {};

                search_field[key_field] = {$regex: key_value, $options: 'i'};

                querystring['$or'].push(search_field);
            }

            if (keys[0] === 'sort' && ['asc', 'desc'].includes(key_value)) {
                sort[key_field] = key_value;
            }

            delete querystring[key];
        }
    });

    if (querystring['$or'] && querystring['$or'].length === 1) {
        querystring = {...querystring, ...querystring['$or'][0]};

        delete querystring['$or'];
    }

    return {querystring, sort};
};