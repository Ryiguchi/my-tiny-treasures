import { GeoLocation } from './general.interfaces';

export interface User {
  email: string;
  id: string;
  name: string;
  newMessages: number;
  location?: GeoLocation;
  saved: string[];
}
export interface Post {
  mainCategory: string;
  subCategory: string;
  condition: string;
  createdAt: string;
  description: string;
  id: string;
  images: string[];
  itemCount: number;
  location: {
    coordinates: [number, number];
    type: string;
    city?: string;
  };
  size?: number;
  age: string;
  title: string;
  user: string;
  userName: string;
  _id: string;
  distance?: number;
}
