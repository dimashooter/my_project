import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsPageSchema } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationSlice';

export const articleDetailsPageReducer =
    combineReducers<articleDetailsPageSchema>({
        comments: articleDetailsCommentsReducer,
        recommendations: articleDetailsRecommendationsReducer,
    });
