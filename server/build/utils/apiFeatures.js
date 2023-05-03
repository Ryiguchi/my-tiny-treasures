"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.countAndPaginate = exports.sort = exports.filter = exports.search = exports.distanceFrom = void 0;
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
const countAndPaginate = (queryString) => {
    const page = parseInt(queryString.page) || 1;
    const limit = parseInt(queryString.limit) || 20;
    const skip = (page - 1) * limit;
    return [
        {
            $facet: {
                metadata: [
                    {
                        $group: {
                            _id: null,
                            totalResults: { $sum: 1 },
                        },
                    },
                    {
                        $addFields: {
                            totalPages: { $ceil: { $divide: ['$totalResults', limit] } },
                            nextPage: page + 1,
                        },
                    },
                ],
                posts: [
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                ],
            },
        },
        {
            $unwind: '$metadata',
        },
    ];
};
exports.countAndPaginate = countAndPaginate;
const paginate = (queryString) => {
    return [];
};
exports.paginate = paginate;
// export const count = (queryString: StringObject): PipelineStage.Group => {
//   return {
//     $group: {
//       _id: null,
//       total: { $sum: 1 },
//       page: { $sum: queryString.page },
//       posts: { $push: '$$ROOT' },
//     },
//   };
// };
// export const paginate = (queryString: StringObject): PipelineStage[] => {
//   const page: number = parseInt(queryString.page) || 1;
//   const limit: number = parseInt(queryString.limit) || 20;
//   const skip = (page - 1) * limit;
//   return [
//     {
//       $skip: skip,
//     },
//     {
//       $limit: limit,
//     },
//   ];
// };
