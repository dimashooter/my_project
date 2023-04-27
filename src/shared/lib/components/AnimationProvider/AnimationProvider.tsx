import {
    createContext, useContext, useEffect, useMemo, useRef, useState,
} from 'react';

type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')

interface AnimationContextProps {
    Spring?: SpringType
    Gesture?: GestureType
    isLoaded?: boolean
}

const AnimationContext = createContext<AnimationContextProps>({});

const asyncFetchAnimation = async () => {
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
};

export const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        asyncFetchAnimation().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            setIsLoaded(true);
        });
    }, []);
    const value = useMemo(
        () => ({
            isLoaded,
            Spring: SpringRef.current,
            Gesture: GestureRef.current,
        }),
        [isLoaded],
    );
    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimationLibraries = () => {
    return useContext(AnimationContext) as Required<AnimationContextProps>;
};
