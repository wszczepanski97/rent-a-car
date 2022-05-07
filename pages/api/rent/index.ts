import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { DataOd, DataDo, Kwota } = req.body;
  if (!req.body.dateFrom || !req.body.dateto || !req.body.price) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "First or last name not found" });
  }
  // const rent = await prisma.wypozyczenia.create({
  //   data: {
  //     DataOd,
  //     DataDo,
  //     Kwota,
  //   },
  // });
  return res.status(200).json({ data: { name: "John Doe" } });
}
