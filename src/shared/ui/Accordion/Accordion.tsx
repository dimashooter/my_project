import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Accordion.module.scss';

interface AccordionProps {
    className?: string
}
export const Accordion = memo((props: AccordionProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.Accordion, {}, [className])} />
    );
});
