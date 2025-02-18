import { useState } from 'react';
import styled from 'styled-components';
import icon from '../../assets/images/invader.png';

const larguraBotao = '20px';
const alturaBotao = '20px';

const Barra = styled.div<{ $visible: boolean }>`
    width: 100vw;
    display: ${({ $visible }) => (!$visible ? 'flex' : 'none')};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #1c1c1c;
    border-radius: 50%;
    color: white;
    -webkit-app-region: drag;
    margin-top: 5px;
`;

const Icon = styled.img`
    height: 20px;
    margin-left: 10px;
`;

const Titulo = styled.h1`
    font-size: 16px;
`;

const Caixa1 = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100px;
`;

const Caixa2 = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100px;
    gap: 5px;
`;

const Minimizar = styled.div<{ $minicolor: boolean }>`
    -webkit-app-region: no-drag;
    width: ${larguraBotao};
    height: ${alturaBotao};
    border: 2px inset black;
    cursor: pointer;
    background-color: ${({ $minicolor }) => ($minicolor ? '#bcff92' : '#3c1c5c')};

    &:hover {
      border: outset;
    }
`;

const Maximizar = styled.div`
    -webkit-app-region: no-drag;
    width: ${larguraBotao};
    height: ${alturaBotao};
    border: 2px inset black;
    background-color: #3c1c5c;

    &:hover {
        cursor: pointer;
        background-color: #77b2ff;
        border: outset;
    }
`;

const Fechar = styled.div`
    -webkit-app-region: no-drag;
    width: ${larguraBotao};
    height: ${alturaBotao};
    margin-right: 10px;
    border: 2px inset black;
    background-color: #3c1c5c;

    &:hover {
        cursor: pointer;
        background-color: #ff5454;
        border: outset;
    }
`;

type isCheia = {
    isCheia: boolean
}

export const BarraJanela = (isCheia:isCheia) => {
    const [miniColor, setMiniColor] = useState(false);

    return (
        <Barra $visible={!isCheia}>
            <Caixa1>
                <Icon src={icon} />
            </Caixa1>

            <Titulo>Aero Final</Titulo>

            <Caixa2>
                <Minimizar
                    onMouseMove={() => { setMiniColor(true) }}
                    onMouseOut={() => { setMiniColor(false) }}
                    onClick={() => { window.api.send('minimizar'); setMiniColor(false) }}
                    $minicolor={miniColor}
                />

                <Maximizar onClick={() => { window.api.send('maximizar') }} />

                <Fechar onClick={() => { window.api.send('fechar'); }} />
            </Caixa2>
        </Barra>
    );
};