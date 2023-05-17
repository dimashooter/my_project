import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/article-list.svg';
import TiledIcon from '@/shared/assets/icons/article-list-1.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../entities/Article/model/types/article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Card } from '@/shared/ui/redesigned/Card/Card';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({ name: 'isAppRedesigned', on: () => TiledIcon, off: () => TiledIconDeprecated })
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({ name: 'isAppRedesigned', on: () => ListIcon, off: () => ListIconDeprecated })

    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures name='isAppRedesigned'
            on={
                <Card className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}>
                    {viewTypes.map((viewType) => (
                        <Button
                            className={cls.button}
                            key={viewType.view}
                            variant='clear'
                            onClick={onClick(viewType.view)}
                        >
                            <Icon
                                Svg={viewType.icon}
                                className={classNames('', {
                                    [cls.notSelected]: viewType.view !== view,
                                })}
                                size={32}
                            />
                        </Button>
                    ))}
                </Card>
            }
            off={
                <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            key={viewType.view}
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                        >
                            <IconDeprecated
                                Svg={viewType.icon}
                                className={classNames('', {
                                    [cls.notSelected]: viewType.view !== view,
                                })}
                                width={32}
                                height={32}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});
