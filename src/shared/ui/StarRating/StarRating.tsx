import { memo, useState } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/StarIcon.svg';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
    className?: string;
    size?: number
    onSelect?: (StartCount: number) => void
    selectedStar?: number
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className, selectedStar = 0, size = 30, onSelect,
    } = props;

    const [currentStarsCounts, setCurrentStarsCount] = useState(selectedStar);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStar));

    const onHover = (star: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(star);
        }
    };
    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (star: number) => () => {
        if (!isSelected) {
            onSelect?.(star);
            setCurrentStarsCount(star);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((star, idx) => (
                <Icon
                    onMouseEnter={onHover(star)}
                    onMouseLeave={onLeave}
                    Svg={StarIcon}
                    className={classNames(cls.star, {
                        [cls.hovered]: currentStarsCounts >= star,
                        [cls.selected]: isSelected,
                    }, [])}
                    width={size}
                    height={size}
                    key={idx}
                    onClick={onClick(star)}
                />
            ))}
        </div>
    );
});
