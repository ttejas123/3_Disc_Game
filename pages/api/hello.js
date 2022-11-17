// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from '../../utils/connectMongo';
export default async function handler(req, res) {
  const mail = req.body.mail;
  await connectMongo();
  res.status(200).json({ name: mail })
}
