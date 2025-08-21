import type { RequestHandler } from '@4399ywkf/bundler-webpack';
import { join } from 'path';

export const faviconMiddleware: RequestHandler = (req, res, next) => {
  if (req.path === '/favicon.ico') {
    res.sendFile(join(__dirname, '../../../assets/umi.png'));
  } else {
    next();
  }
};
