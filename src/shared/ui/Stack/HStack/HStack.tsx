import { memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = memo((props: HStackProps) => {
    return (
        // eslint-disable-next-line i18next/no-literal-string
        <Flex direction="row" {...props} />
    );
});
