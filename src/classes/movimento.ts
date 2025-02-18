export const spawnDasPedras = () => {
  const spawn = {
    1: {
      x: -100,
      y: -100,
      movi: (x: number, y: number, speed: number) => {
        return {
          x: x + speed,
          y: y + speed,
        };
      },
    },
  };

  spawn
};