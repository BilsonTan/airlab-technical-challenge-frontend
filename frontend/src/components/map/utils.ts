const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

const routeColorMap = new Map<string, string>();

export const getColorForRoute = (adep: string, ades: string): string => {
  const key = `${adep}-${ades}`;
  if (!routeColorMap.has(key)) {
    routeColorMap.set(key, getRandomColor());
  }
  return routeColorMap.get(key)!;
};