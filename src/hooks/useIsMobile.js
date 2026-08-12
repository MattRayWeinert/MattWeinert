import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 800px)';

const getIsMobile = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }
    return window.matchMedia(MOBILE_QUERY).matches;
};

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(getIsMobile);

    useEffect(() => {
        const media = window.matchMedia(MOBILE_QUERY);
        const onChange = () => setIsMobile(media.matches);

        onChange();
        if (media.addEventListener) {
            media.addEventListener('change', onChange);
            return () => media.removeEventListener('change', onChange);
        }

        media.addListener(onChange);
        return () => media.removeListener(onChange);
    }, []);

    return isMobile;
};

export default useIsMobile;
