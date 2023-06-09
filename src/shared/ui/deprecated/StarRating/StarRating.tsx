import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIconDeprecated from '@/shared/assets/icons/StarIcon.svg';
import StarIcon from '@/shared/assets/icons/newStar.svg';
import { Icon as IconDeprecated } from '../Icon/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon/Icon';

interface StarRatingProps {
    className?: string;
    size?: number;
    onSelect?: (StartCount: number) => void;
    selectedStar?: number;
}

const stars = [1, 2, 3, 4, 5];
/**
    * use redesigned folder components
    * @deprecated
    */
export const StarRating = memo((props: StarRatingProps) => {
    const { className, selectedStar = 0, size = 30, onSelect } = props;

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
        <ToggleFeatures
            on={
                <div className={classNames(cls.StarRatingRedesigned, {}, [className])}>
                    {stars.map((star, idx) => (
                        <Icon
                            clickable={!isSelected}
                            onMouseEnter={onHover(star)}
                            onMouseLeave={onLeave}
                            Svg={StarIcon}
                            className={classNames(
                                cls.star,
                                {
                                    [cls.selected]: isSelected,
                                },
                                [currentStarsCounts >= star ? cls.hovered : cls.normal,]
                                ,
                            )}
                            width={size}
                            height={size}
                            key={idx}
                            onClick={onClick(star)}
                            data-testid={`Rating.${star}`}
                            date-selected={currentStarsCounts >= star}
                        />
                    ))}
                </div>
            }
            off={
                <div className={classNames(cls.StarRating, {}, [className])}>
                    {stars.map((star, idx) => (
                        <IconDeprecated
                            onMouseEnter={onHover(star)}
                            onMouseLeave={onLeave}
                            Svg={StarIconDeprecated}
                            className={classNames(
                                cls.starRedesigned,
                                {
                                    [cls.hovered]: currentStarsCounts >= star,
                                    [cls.selected]: isSelected,
                                },
                                [],
                            )}
                            width={size}
                            height={size}
                            key={idx}
                            onClick={onClick(star)}
                            data-testid={`Rating.${star}`}
                            date-selected={currentStarsCounts >= star}
                        />
                    ))}
                </div>
            }
            name='isAppRedesigned'
        />
    );
});
