import { memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = memo((props: VStackProps) => {
    return (
        // eslint-disable-next-line i18next/no-literal-string
        <Flex direction="column" {...props} />
    );
});
