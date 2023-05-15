import {
    ImgHTMLAttributes,
    ReactElement,
    memo,
    useLayoutEffect,
    useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    Errorfallback?: ReactElement;
}
export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        alt = 'image',
        src,
        fallback,
        Errorfallback,
        ...otherProps
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setIsError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setIsError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }
    if (hasError && Errorfallback) {
        return Errorfallback;
    }
    return (
        <img
            src={src}
            alt={alt}
            className={classNames('', {}, [className])}
            {...otherProps}
        />
    );
});
