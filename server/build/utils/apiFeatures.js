"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = exports.filter = exports.search = exports.distanceFrom = void 0;
const distanceFrom = (userLocation) => {
    return {
        $geoNear: {
            near: userLocation,
            distanceField: 'distance',
            spherical: true,
            distanceMultiplier: 0.001,
        },
    };
};
exports.distanceFrom = distanceFrom;
const search = (queryString) => {
    if (!queryString.search)
        return { $match: {} };
    const term = queryString.search;
    return {
        $match: {
            $or: [
                { title: { $regex: `.*${term}.*`, $options: 'i' } },
                { description: { $regex: `.*${term}.*`, $options: 'i' } },
            ],
        },
    };
};
exports.search = search;
const filter = (queryString) => {
    const queryObj = Object.assign({}, queryString);
    const excludedFields = ['search', 'page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);
    let match = { $match: {} };
    Object.entries(queryObj).forEach(([key, value]) => {
        match.$match[key] = isNaN(parseFloat(value)) ? value : Number(value);
    });
    return match;
};
exports.filter = filter;
const sort = (queryString) => {
    if (!queryString.sort)
        return { $sort: { createdAt: -1 } };
    const sortBy = queryString.sort.split(',');
    const sortObj = {};
    sortBy.forEach((field) => {
        const sortOrder = field.startsWith('-') ? -1 : 1;
        const fieldName = field.replace(/^-/, '');
        sortObj[fieldName] = sortOrder;
    });
    return { $sort: sortObj };
};
exports.sort = sort;
// paginate() {
//   const page = +this.queryString.page || 1;
//   const limit = +this.queryString.limit || 100;
//   const skip = (page - 1) * limit;
//   this.query = this.query.skip(skip).limit(limit);
//   return this;
// }
