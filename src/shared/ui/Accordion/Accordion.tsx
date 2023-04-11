import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { log } from 'console';
import cls from './Accordion.module.scss';

interface AccordionProps {
    className?: string
}

const slides = [
    { text: 'Lorem ipsum dolor sit amet.', img: 'https://picsum.photos/600/600.webp', id: 0 },
    { text: 'Lorem ipsum dolor sit amet.', img: 'https://picsum.photos/600/600.webp', id: 1 },
    { text: 'Lorem ipsum dolor sit amet.', img: 'https://picsum.photos/600/600.webp', id: 2 },
    { text: 'Lorem ipsum dolor sit amet.', img: 'https://picsum.photos/600/600.webp', id: 3 },
    { text: 'Lorem ipsum dolor sit amet.', img: 'https://picsum.photos/600/600.webp', id: 4 },
];

export const Accordion = memo((props: AccordionProps) => {
    const { className } = props;
    const [value, setValue] = useState(0);

    function HandleValue(item: { text: string, img: string, id: number }) {
        setValue(item.id);
    }
    return (
        <div className={classNames(cls.Accordion, {}, [className])}>
            {
                slides.map((slide) => (
                    <div
                        key={slide.id}
                        className={classNames(
                            cls.Accordion_wrapper,
                            { [cls.active]: slide.id === value },
                            [],
                        )}
                        onClick={() => HandleValue(slide)}
                    >
                        <div className={classNames(cls.accordion_panel, { [cls.active]: slide.id === value }, [])}>
                            <span>{slide.text}</span>
                            <div className={cls.accordion_content}>
                                <img className={cls.img} src={slide.img} alt="slide" />
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    );
});
