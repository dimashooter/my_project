import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text } from '../Text/Text';

import { MyDropdown } from './Dropdown';
import { Button } from '../Button/Button';

export default {
    title: 'shared/Dropdown',
    component: MyDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MyDropdown>;

const Template: ComponentStory<typeof MyDropdown> = (args) => <MyDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    items: [
        { content: 'test' },
        { content: 'test' },
        { content: 'test' },
    ],
    trigger: <Button>open</Button>,
};
