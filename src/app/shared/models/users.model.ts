export interface SignupNewUser {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface SignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName?: string;
}

export interface Users {
  email: string;
  password: string;
  role: string;
  name: string;
  dob: Date;
}

export interface UsersWithId {
  email: string;
  password: string;
  role: string;
  name: string;
  dob: Date;
  id: string;
}

export interface localStorageResponse {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}