import axios from "axios";
import FormData from "form-data";
import fs from 'node:fs'
import fetch from 'node-fetch'
import path from "node:path";
import { v4 as uuidV4} from 'uuid'
import * as pd from 'pandas-js'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class AxiosService {
    async createMarkup(file, file_name) {
        let data = new FormData()
        console.log(file_name)
        let file_true = fs.createReadStream(path.resolve(__dirname, '..', 'static', file_name))
        data.append('file', file_true)
        const response = await fetch(`${process.env.MODEL_API}/model`, {
            method: 'POST',
            body: data
        })
        const json_response = await response.json()
        console.log('json_response')
        console.log(json_response)
        return json_response
    }
    async createCSV(markup) {
        // let data = pd.DataFrame({'time': []})
        return file_response
    }
}
export default new AxiosService();