interface IToken {
  _id: string;
  accessToken: string;
  refreshToken: string;
  _userId: string;
}

interface ITokenPayload {
  userId: string;
  role: string;
}

type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
type IRefresh = Pick<IToken, "refreshToken">;

export { IRefresh, IToken, ITokenPair, ITokenPayload };
