import { MainCategories } from './enums';

const base = 'http://localhost:8000';

export const fileRefs = {
  clothesMain: `${base}/photos/clothes-main.png`,
  homeMain: `${base}/photos/home/hero.png`,
  clothes: [`${base}/photos`],
  logoBig: `${base}/photos/logo-1.png`,
  google: `${base}/photos/google.png`,
  sendMessage: `${base}/photos/send-message-icon.svg`,
};

interface CategoryRefs {
  [key: string]: string[];
}

const homeUrl = `${base}/photos/home`;

export const categoryRefs: CategoryRefs = {
  Clothes: [
    `${homeUrl}/clothes-1.png`,
    `${homeUrl}/clothes-2.png`,
    `${homeUrl}/clothes-3.png`,
  ],
  Toys: [
    `${homeUrl}/toys-1.png`,
    `${homeUrl}/toys-2.png`,
    `${homeUrl}/toys-3.png`,
  ],
  Other: [
    `${homeUrl}/other-1.png`,
    `${homeUrl}/other-2.png`,
    `${homeUrl}/other-3.png`,
  ],
};

export const googleCallbackUrl = 'http://localhost:8000/auth/google';
