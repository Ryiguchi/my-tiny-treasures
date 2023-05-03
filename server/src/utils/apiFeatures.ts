import { PipelineStage } from 'mongoose';
import { LocationData, StringObject } from './interfaces';

export const distanceFrom = (
  userLocation: LocationData
): PipelineStage.GeoNear => {
  return {
    $geoNear: {
      near: userLocation,
      distanceField: 'distance',
      spherical: true,
      distanceMultiplier: 0.001,
    },
  };
};

export const search = (queryString: StringObject): PipelineStage.Match => {
  if (!queryString.search) return { $match: {} };
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

export const filter = (queryString: StringObject): PipelineStage.Match => {
  const queryObj = { ...queryString };
  const excludedFields = ['search', 'page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(field => delete queryObj[field]);

  let match: PipelineStage.Match = { $match: {} };
  Object.entries(queryObj).forEach(([key, value]) => {
    match.$match[key] = isNaN(parseFloat(value)) ? value : Number(value);
  });
  return match;
};

export const sort = (queryString: StringObject): PipelineStage.Sort => {
  if (!queryString.sort) return { $sort: { createdAt: -1 } };

  const sortBy = queryString.sort.split(',');
  const sortObj: Record<string, 1 | -1> = {};
  sortBy.forEach((field: string) => {
    const sortOrder = field.startsWith('-') ? -1 : 1;
    const fieldName = field.replace(/^-/, '');
    sortObj[fieldName] = sortOrder;
  });
  return { $sort: sortObj };
};

export const countAndPaginate = (
  queryString: StringObject
): PipelineStage[] => {
  const page: number = parseInt(queryString.page) || 1;
  const limit: number = parseInt(queryString.limit) || 20;
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

export const paginate = (queryString: StringObject): PipelineStage[] => {
  return [];
};
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
