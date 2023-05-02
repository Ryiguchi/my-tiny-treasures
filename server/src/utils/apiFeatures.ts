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

// paginate() {
//   const page = +this.queryString.page || 1;
//   const limit = +this.queryString.limit || 100;
//   const skip = (page - 1) * limit;

//   this.query = this.query.skip(skip).limit(limit);
//   return this;
// }
