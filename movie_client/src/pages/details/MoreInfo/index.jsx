import Tab from '@/components/Tab/index'
import Cast from './cast/Cast';
import Official from './official/VideosSection';
import SimilarMovies from './similar/Similar';

export default function MoreInfo() {
    const listTab = [
        {
            label: 'Cast & Crew',
            value: 0,
            component: <Cast />,
        },
        {
            label: 'Official Websites',
            value: 1,
            component: <Official />,
        },
        {
            label: 'Similar Movies',
            value: 2,
            component: <SimilarMovies />,
        },
    ];

    return (
        <Tab listTab={listTab} />
    );
}