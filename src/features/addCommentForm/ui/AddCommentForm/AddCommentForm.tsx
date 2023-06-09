import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';
import {
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                name='isAppRedesigned'
                on={
                    <Card padding='24' border='semi' max>
                        <HStack
                            data-testid='CommentForm'
                            gap="16"
                            max
                            className={classNames(cls.AddCommentFormRedesigne, {}, [className])}
                        >
                            <Input
                                className={cls.input}
                                placeholder={t('Введите текст комментария') || ''}
                                value={text}
                                onChange={onCommentTextChange}
                                data-testid='CommentForm.Input'

                            />
                            <Button variant='outline' onClick={onSendHandler}
                                data-testid='CommentForm.Button'
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        data-testid='CommentForm'
                        gap="8"
                        max
                        className={classNames(cls.AddCommentForm, {}, [className])}
                    >
                        <InputDeprecated
                            className={cls.input}
                            placeholder={t('Введите текст комментария') || ''}
                            value={text}
                            onChange={onCommentTextChange}
                            data-testid='CommentForm.Input'

                        />
                        <ButtonDeprecated theme={ButtonTheme.OUTLINE} onClick={onSendHandler}
                            data-testid='CommentForm.Button'
                        >
                            {t('Отправить')}
                        </ButtonDeprecated>
                    </HStack>
                }
            />
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
