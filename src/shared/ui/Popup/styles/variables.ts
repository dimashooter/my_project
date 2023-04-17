import PopupCls from './popup.module.scss';

export type directionType = 'top left' | 'top right' | 'bottom left' | 'bottom right'

export const directionClasses: Record<directionType, string> = {
    'bottom left': PopupCls.optionsBottomLeft,
    'bottom right': PopupCls.optionsBottomRight,
    'top left': PopupCls.optionsTopLeft,
    'top right': PopupCls.optionsTopRight,
};
