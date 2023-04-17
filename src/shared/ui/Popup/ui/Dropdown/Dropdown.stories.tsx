import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../../../Button/Button';
import { MyDropdown } from './Dropdown';

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
