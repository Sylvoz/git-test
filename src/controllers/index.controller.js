import {POOL} from "../db.js";

export const ping = async (req, res) => {
  const [result] = await POOL.query('select "Pong" as result');
  res.json(result[0]);
};
