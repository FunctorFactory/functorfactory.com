import Image from 'next/image';
import React from 'react';

import LogoSvg from '@/public/Functor-Logo-White.svg';

export type LogoProps = Omit<Parameters<typeof Image>[0], 'src'>;

/**
 *
 * @param props
 */
export default function Logo(props: LogoProps) {
  return <Image src={LogoSvg} {...props} />;
}
