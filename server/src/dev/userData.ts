'use strict';

import { Point } from '../utils/interfaces';

const names = [
  'Sophie',
  'Emma',
  'Mia',
  'Olivia',
  'Leon',
  'Luca',
  'Noah',
  'Lukas',
  'Emil',
  'Elias',
];

const emails = names.map(name => `${name.toLowerCase()}@gmail.com`);

function getRandomDate() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const today = new Date();

  const randomTime =
    sixMonthsAgo.getTime() +
    Math.random() * (today.getTime() - sixMonthsAgo.getTime());
  const randomDate = new Date(randomTime);

  return randomDate;
}

function getRandomCoordinatesInSweden(): [number, number] {
  // Define the bounds of the area we want to generate coordinates in
  const latMin = 55.2371;
  const latMax = 69.0605;
  const lonMin = 10.5986;
  const lonMax = 24.1935;

  // Generate random latitude and longitude within the bounds
  const lat = Math.random() * (latMax - latMin) + latMin;
  const lon = Math.random() * (lonMax - lonMin) + lonMin;

  // Return the coordinates as an array with longitude first
  return [lon, lat];
}

const createData = (i: number) => {
  return {
    name: names[i],
    email: emails[i],
    password: 'aaaaaaaa',
    passwordConfirm: 'aaaaaaaa',
    location: {
      type: Point.Point,
      coordinates: getRandomCoordinatesInSweden(),
    },
    createdAt: getRandomDate(),
  };
};

export const users = Array(10)
  .fill(null)
  .map((_, i) => createData(i));
