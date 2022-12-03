export interface SignupNewUser{
    email: string;
    password: string;
    returnSecureToken: boolean;
  }
  
  export interface SignUpResponse{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    displayName?: string;
  }
  