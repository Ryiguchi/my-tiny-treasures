export interface ConvertedChangeData {
  name: string;
  value: string | string[] | File[];
}

export interface InitialChangeData {
  name: string;
  value: string | File;
}

export interface GeoLocation {
  coordinates: [number, number];
  type: string;
  city?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface FileData {
  name: string;
  type: string;
  lastModified: number;
  size: number;
  content: Blob;
}
