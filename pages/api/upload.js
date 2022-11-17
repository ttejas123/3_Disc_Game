import formidable from "formidable";
import fs from "fs";
import connectMongo from '../../utils/connectMongo';
import Postschema from './schema/post'

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const {status, data} = await saveFile(files.file, fields);
    return res.status(status).json({data: data});
  });
};

const saveFile = async (file, fields) => {
  try{
    await connectMongo();
    const date = new Date();
    const data1 = fs.readFileSync(file.filepath);
    const imgPath = date.getTime()+file.originalFilename;
    fs.writeFileSync(`./public/${imgPath}`, data1);

    const data_to_store = {
      mail:fields.mail,
      url:imgPath
    }

    const post = await Postschema.create(data_to_store); 

    return {status: 200, data: post};
  } catch (e) {
    return {status: 404, data: "Unable to Upload file to Metaplex"};
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
