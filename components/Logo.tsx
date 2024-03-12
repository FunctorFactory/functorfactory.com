import React from "react";

import Image from 'next/image';
import LogoSvg from '@/public/logo.svg';

export type LogoProps = Omit<Parameters<typeof Image>[0], 'src'>;

export default function Logo(props: LogoProps) {
    return (
        <Image
            src={LogoSvg}
            {...props}
        />
    )
}