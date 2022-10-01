import { metaplex, LAMPORTS_PER_SOL, toMetaplexFile, authenticateToken } from './metaplex_D'
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const auth = await authenticateToken(req, res)
  // console.log(auth)
  if(!auth) return res.status(404).json({uri: "Failed in authentication"})
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const {status, uri} = await saveFile(files.file);
    return res.status(status).json({uri: uri});
  });
};

const saveFile = async (file) => {
  try{
    const data1 = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/${file.originalFilename}`, data1);
    var data = fs.readFileSync(`./public/${file.originalFilename}`);
    const bundlrStorage = metaplex.storage().driver();
    const getUploadCost = await (await metaplex.storage().getUploadPriceForFile(data)).basisPoints.toString(10)
    const cost = parseInt(getUploadCost, 10)
    const fundToSet = cost / LAMPORTS_PER_SOL + 50;
    (await bundlrStorage.bundlr()).fund(parseInt(fundToSet));
    const uploaddata = await toMetaplexFile(data, `./public/${file.originalFilename}`) 
    let uri = await metaplex.storage().upload(uploaddata)
    console.log("Uploaded File URI:- "+uri);
    await fs.unlinkSync(`./public/${file.originalFilename}`);
    return {status: 200, uri: uri};
  } catch (e) {
    return {status: 404, uri: "Unable to Upload file to Metaplex"};
  }
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};
