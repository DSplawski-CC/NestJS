import { CookieOptions, Response } from 'express';


type TokenCookieOptions = Pick<CookieOptions, 'secure' | 'maxAge' | 'expires'>

export function setRefreshTokenCookie(res: Response, token: string, tokenCookieOptions:  TokenCookieOptions) {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: tokenCookieOptions?.secure,
    domain: process.env.DOMAIN,
    sameSite: 'lax',
    path: '/',
    expires: tokenCookieOptions?.expires,
    maxAge: tokenCookieOptions?.maxAge,
  });
}

export function clearRefreshTokenCookie(res: Response) {
  res.clearCookie('refresh_token',
    {
      path: '/',
      domain: process.env.DOMAIN,
    });
}
