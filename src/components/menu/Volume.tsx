import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { setVolume } from '../../store/reducers/volumeSlice'
import styled from "styled-components";

const Caixa = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    height: 100%;
    width: 100%;
`

const BarraVolume = styled.input`
    -webkit-appearance: none;
    appearance: none;
    height: 20px;
    width: 100%;
    margin-right: 3px;
    background-color: #313136;
    border: 2px inset white;
    outline: none;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        background-color: #3C3C3C;
        border: 2px outset white;
        cursor: pointer;
    }
`

const Button = styled.div`
    width: 100%;
    height: 100%;
`;

export const Volume = () => {
    const [modal, setModalOpen] = useState(false);
    const [range, setRange] = useState(1);
    const [cursor, setCursor] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setVolume(range))
    }, [range])

    useEffect(() => {
        const intervalo = setTimeout(() => {
            if (cursor) return;
            setModalOpen(false);
        }, 1000)

        if (!cursor) {
            return () => clearTimeout(intervalo);
        }
    }, [cursor])

    useEffect(() => {
        const vol = localStorage.getItem('volume');
        if (vol) {
            setRange(Number(vol));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('volume', JSON.stringify(range));
    }, [range]);

    return (
        <Caixa>
            {modal ?
                <BarraVolume
                    type="range"
                    min="1"
                    max="100"
                    value={range}
                    onChange={(e) => { setRange(Number(e.target.value)) }}
                    onMouseEnter={() => { setCursor(true) }}
                    onMouseLeave={() => { setCursor(false) }}
                ></BarraVolume>
                :
                <Button onClick={() => { setModalOpen(true) }}>Volume</Button>
            }
        </Caixa>
    )
}