import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props;

        return (
            <ToggleFeatures name='isAppRedesigned' on={
                <div
                    className={classNames(cls.ArticleImageBlockComponent, {}, [
                        className,
                    ])}
                >
                    <img src={block.src} alt={block.title} className={cls.img} />
                    {block.title && (
                        <Text TextVariant='accent' text={block.title} align='center' />
                    )}
                </div>
            }
                off={
                    <div
                        className={classNames(cls.ArticleImageBlockComponent, {}, [
                            className,
                        ])}
                    >
                        <img src={block.src} alt={block.title} className={cls.img} />
                        {block.title && (
                            <TextDeprecated text={block.title} align={TextAlign.CENTER} />
                        )}
                    </div>} />

        );
    },
);
