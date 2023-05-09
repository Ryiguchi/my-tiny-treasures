export interface GeoLocation {
  coordinates: [number, number];
  type: string;
  city?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}
