import { Montserrat } from 'next/font/google';
import type { CustomFlowbiteTheme } from 'flowbite-react';

export const MontserratBlack = Montserrat({
    subsets: ['latin'],
    weight: "900",
});

export const MontserratRegular = Montserrat({
    subsets: ['latin'],
    weight: "400",
});

export const Theme: CustomFlowbiteTheme = {
};