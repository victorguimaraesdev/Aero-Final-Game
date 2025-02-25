import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import menu from "../../assets/audios/menu.mp3";

export const BackgroundMusic = () => {
    const { volume: vol } = useSelector((state: RootState) => state.volumeState);
    const volume = Number(vol) / 500;

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        audioRef.current?.play();
    }, []);

    return (
        <audio ref={audioRef} loop autoPlay>
            <source src={menu} type="audio/mpeg" />
        </audio>
    );
};