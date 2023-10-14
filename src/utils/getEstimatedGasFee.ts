import axios from "axios";

export const getEstimateTime = async (gas: string) => {
  const APIKEY = "ZWDAKBGMB9PTWI4S8VE4ZT9ZISAKW45ZBZ";
  const res = await axios.get(
    `https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=${gas}&apikey=${APIKEY}`
  );
};

const key = "2e7dd15758474e0ea03fb5a8dea6abaf";
const network = "eth";
export const estimateGasFee = async () => {
  const res = await axios.get(
    `https://api.owlracle.info/v4/${network}/gas?apikey=${key}`
  );
  return res.data.speeds[0];
};
