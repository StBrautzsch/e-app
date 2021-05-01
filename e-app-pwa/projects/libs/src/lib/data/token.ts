export class Token {
  token: string;
  expiration: Date;

  constructor(raw: TokenRaw) {
    this.token = raw.token;
    this.expiration = new Date(raw.expiration);
  }

}

export interface TokenRaw {
  token: string;
  expiration: string;
}
