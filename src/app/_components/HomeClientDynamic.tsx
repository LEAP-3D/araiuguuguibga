'use client';

import nextDynamic from 'next/dynamic';

export default nextDynamic(() => import('./HomeClient'), { ssr: false });
