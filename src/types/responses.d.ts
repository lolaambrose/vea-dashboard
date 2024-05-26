export interface ILoginResponse {
   token: string;
   refreshToken: string;
}

export interface IMeResponse {
   user: IUser;
}
