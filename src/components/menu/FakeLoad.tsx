import { useEffect, useState } from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div<{ $loading: boolean }>`
    display: ${({ $loading }) => $loading ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: black;
    z-index: 10;
`;

const ProgressBar = styled.div`
    width: 80%;
    height: 40px;
    background-color: #1C1C1C;
    border: 2px outset #1C1C1C;
    overflow: hidden;
`;

const Progress = styled.div<{ $progress: number }>`
    width: ${({ $progress }) => $progress}%;
    height: 100%;
    background-color: #3c1c5c;
    border: 2px inset #1C1C1C;
    transition: width 0.3s;
`;

export const Loading = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((time) => {
                if (time >= 10) {
                    clearInterval(interval);
                    setLoading(false);
                    return 10;
                }
                return time + 1;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <LoadingContainer $loading={loading}>
            <ProgressBar>
                <Progress $progress={progress} />
            </ProgressBar>
        </LoadingContainer>
    );
}