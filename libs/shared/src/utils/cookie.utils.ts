import { CookieOptions, Response } from 'express';
import * as process from 'node:process';

type TokenCookieOptions = Pick<CookieOptions, 'secure' | 'maxAge'>

export function setRefreshTokenCookie(res: Response, token: string, tokenCookieOptions:  TokenCookieOptions) {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    // secure: tokenCookieOptions?.secure ?? true,
    secure: false,
    sameSite: 'strict',
    path: '/',
    maxAge: tokenCookieOptions?.maxAge ?? 0,
  });
}

export function clearRefreshTokenCookie(res: Response) {
  res.clearCookie('refresh_token', { path: '/' });
}
