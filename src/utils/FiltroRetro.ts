import { css } from 'styled-components';

export const filtroRetro = () => css`
    filter: contrast(1.2) saturate(1.3) blur(0.4px);
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0px,
            rgba(0, 0, 0, 0.2) 1px,
            rgba(0, 0, 0, 0) 2px,
            rgba(0, 0, 0, 0) 4px
        );
        pointer-events: none;
        z-index: 3;
    }

    &::after {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(
            circle,
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 0.7) 100%
        );
        pointer-events: none;
        z-index: 3;
    }
`;