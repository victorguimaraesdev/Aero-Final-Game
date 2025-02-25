interface Window {
    api: render;
}

type Canvas = {
    $largura: number,
    $altura: number,
    setIsRun: (bool: boolean) => void,
}

type TamanhoTela = {
    largura: number,
    altura: number,
}

type Position = {
    x: number,
    y: number,
}

type isRun = {
    isRun: boolean,
    setIsRun: (bool: boolean) => void,
}