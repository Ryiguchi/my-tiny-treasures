import { GeoLocation } from './general.interfaces';

export interface User {
  email: string;
  id: string;
  name: string;
  newMessages: number;
  location?: GeoLocation;
  saved: string[];
  credits: number;
}
export interface Post {
  group: string;
  categories: string[];
  condition: string;
  createdAt: string;
  description: string;
  id: string;
  images: string[];
  itemCount: number;
  location: {
    coordinates?: [number, number];
    type?: string;
    city?: string;
  };
  sizes?: string[];
  age: string;
  title: string;
  user?: string;
  userName: string;
  _id?: string;
  distance?: number;
}
