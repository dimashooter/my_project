import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';
import { FeatureFlagDecorator } from '@/shared/config/storybook/featureFlagDecorator/featureFlagDecorator';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

export const Normal = Template.bind({});
const args = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' },
    },
};
Normal.args = args
export const NormalRedesign = Template.bind({});
NormalRedesign.args = args

NormalRedesign.decorators = [FeatureFlagDecorator({ isAppRedesigned: true })]

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' },
    },
    isLoading: true,
};
