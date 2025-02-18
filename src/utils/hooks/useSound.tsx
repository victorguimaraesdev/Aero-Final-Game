import { useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import hit from "../../assets/audios/hit.mp3";
import menu from "../../assets/audios/menu.mp3";
import select from "../../assets/audios/select.mp3";
import start from "../../assets/audios/start.mp3";
import explosion from "../../assets/audios/explosion.mp3";
import next_level from "../../assets/audios/next_level.mp3";

const efeitosSonoros = {
    hit,
    menu,
    select,
    start,
    explosion,
    next_level,
} as const;

type som = keyof typeof efeitosSonoros;

export const useSound = (src: som) => {
    const { volume: vol } = useSelector((state: RootState) => state.volumeState)
    const volume = (Number(vol) / 100)

    console.log(volume)

    const som = useRef<HTMLAudioElement>(null)
    useEffect(() => {
        const audio = document.createElement("audio")
        document.body.appendChild(audio);
        const source = document.createElement("source")
        source.setAttribute("type", "audio/mpeg")
        source.setAttribute("src", efeitosSonoros[src]);
        audio.appendChild(source);
        som.current = audio;
        audio.volume = volume;
        return () => {
            document.body.removeChild(audio);
        }
    }, [src, volume])

    const play = () => {
        if (som.current) {
            som.current.load();
            som.current.play();
        }
    }

    const pause = () => {
        if (som.current) {
            if (som.current.paused) {
                som.current.play();
            } else {
                som.current.pause()
            }
        }
    }

    const stop = () => {
        if (som.current) {
            som.current.load();
        }
    }

    return [play, pause, stop]
}