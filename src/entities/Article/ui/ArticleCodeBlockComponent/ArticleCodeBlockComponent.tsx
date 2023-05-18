import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code/Code';
import { Code as CodeRedesigned } from '@/shared/ui/redesigned/Code/Code';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';
import { toggleFeatures } from '@/shared/lib/features';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, block } = props;
        const { t } = useTranslation();
        const Code = toggleFeatures({
            name: 'isAppRedesigned', on: () => CodeRedesigned,
            off: () => CodeDeprecated
        })
        return (
            <div
                className={classNames(cls.ArticleCodeBlockComponent, {}, [
                    className,
                ])}
            >
                <Code text={block.code} />
            </div>
        );
    },
);
