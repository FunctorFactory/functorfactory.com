import WebApps from '@/public/web-applications.svg';
import ApiDev from '@/public/api-development.svg';
import ApiIntegration from '@/public/api-integration.svg';
import Mvp from '@/public/mvp-development.svg';
import TechPlan from '@/public/technical-plans.svg';
import DevOps from '@/public/devops.svg';

export type ServiceDescription = {
    title: string;
    href: string;
    image: string;
}

export const ServiceDescriptions: Array<Readonly<ServiceDescription>> = [
    {
        title: 'Web Applications',
        href: '/web-applications',
        image: WebApps
    },
    {
        title: 'API Development',
        href: 'api-development',
        image: ApiDev
    },
    {
        title: 'API Integration',
        href: 'api-integration',
        image: ApiIntegration
    },
    {
        title: 'MVP Development',
        href: 'mvp-development',
        image: Mvp
    },
    {
        title: 'Technical Plans',
        href: 'technical-plans',
        image: TechPlan
    },
    {
        title: 'DevOps',
        href: 'devops',
        image: DevOps
    },
] as const;
