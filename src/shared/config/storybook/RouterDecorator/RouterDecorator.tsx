import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryComponeny: Story) => (
    <BrowserRouter>
        <StoryComponeny />
    </BrowserRouter>
);
