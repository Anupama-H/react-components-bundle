let uniqueCounter = 1;

const utils = {
    getQueryParams: function(params = {}) {
        let queryParams = [];
        
        queryParams = Object.keys(params).map(key => {
            return `${key}=${params[key]}`;
        });

        return queryParams.join("&");
    },
    isEven: function(value) {
        return value % 2 === 0;
    },
    getPagIndex: function(pageConfig) {
        const { perPageCount, pageNo } = pageConfig;
        const startIndex = (pageNo - 1) * perPageCount;
        const endIndex = pageNo * perPageCount;

        return {
            start: startIndex,
            end: endIndex
        };
    },
    omit: function(object = {}, omitKeys = []) {
        let newObject = {};

        for (let key in object) {
            if (omitKeys.indexOf(key) === -1) {
                newObject[key] = object[key];
            }
        }

        return newObject;
    },
    getUniqueId: function() {
        return uniqueCounter++;
    }
}

export default utils;