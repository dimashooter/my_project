import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArticleDetails } from '@/entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { getRouteArticles } from '@/shared/config/routeConfig/routeConfig';
import { Page } from '@/widgets/Page/Page';
import { ArticleRecommendationList } from '@/features/articleRecommendationList';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import { ArticleEditionalContainer } from '../ArticleEditionalContainer/ArticleEditionalContainer';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                on={
                    <StickyLayout
                        content={
                            <Page>
                                <ArticleDetails id={id} />
                                <ArticleRating articleId={id} />
                                <ArticleRecommendationList />
                                <ArticleDetailsComments id={id} />
                            </Page>
                        }
                        right={<ArticleEditionalContainer />}
                    />
                }
                off={<Page>
                    <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                        {t('Назад к списку')}
                    </Button>
                    <ArticleDetails id={id} />
                    <ArticleRating articleId={id} />
                    <ArticleRecommendationList />
                    <ArticleDetailsComments id={id} />
                </Page>}
                name='isAppRedesigned'
            />

        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
