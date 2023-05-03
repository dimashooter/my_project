import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({
        profile: {
            form: {
                id: '1',
                username: 'admin',
                age: 22,
                country: Country.Ukraine,
                lastname: 'ulbi tv',
                first: 'asd',
                city: 'asf',
                currency: Currency.USD,
            },
        },
    })]

} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
    <ProfilePage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),

];
