interface Window {
    api: render;
}

type tamanhoTela = {
    $largura: number,
    $altura: number,
}

type isRun = {
    isRun: boolean,
    setIsRun: (bool: boolean) => void,
}