import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonDirectory = path.join(process.cwd(), 'src', 'json')
  const fileContents = await fs.readFile(jsonDirectory + '/cars.json', 'utf8')
  res.status(200).json(fileContents)
}
