import Tab from '@/components/Tab/index'
import Cast from './cast/Cast';
import Overview from './overview';
import Trailer from './trailer';
import Official from './official/VideosSection';

export default function MoreInfo() {
    const listTab = [
        {
            label: 'Overview',
            value: 0,
            component: <Overview />,
        },
        {
            label: 'Cast & Crew',
            value: 1,
            component: <Cast />,
        },
        {
            label: 'Trailer',
            value: 2,
            component: <Trailer />,
        },
        {
            label: 'Official Websites',
            value: 3,
            component: <Official />,
        },
    ];

    return (
        <Tab listTab={listTab} />
    );
}