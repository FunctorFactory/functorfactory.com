import Image from 'next/image';
import React from 'react';

import BannerImg from '@/public/Functor-Banner.jpg';

export type BannerProps = Omit<Parameters<typeof Image>[0], 'src'>;

/**
 *
 * @param props
 */
export default function Banner(props: BannerProps) {
  return <Image src={BannerImg} {...props} />;
}
