import { DataType } from "../types/types";

export const generateOptions = (
  current: DataType,
  numberData: DataType[]
): DataType[] => {
  const options = [
    numberData[Math.floor(Math.random() * numberData.length)],
    numberData[Math.floor(Math.random() * numberData.length)],
    current,
  ].sort(() => Math.random() - 0.5);

  return options;
};
