import { Car } from "types/car/car.type";

export const spliceIntoChunks = (arr: Car[], chunkSize: number) => {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
};
