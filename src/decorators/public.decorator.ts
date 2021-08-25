import { SetMetadata } from '@nestjs/common';

// creates a @Public() decorator for defining a public endpoint (since all are guarded by default)
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
