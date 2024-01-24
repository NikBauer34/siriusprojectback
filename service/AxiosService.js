import axios from "axios";
import FormData from "form-data";
import fs from 'node:fs'
class AxiosService {
    async createMarkup(file, file_name) {
        const form = new FormData()
        console.log(file)
        console.log(file_name)
        form.append('file', 4)
        const response = await axios.post(`${process.env.MODEL_API}/model`, form, {
            headers: {
                ...form.getHeaders()
            }
        })
        console.log(response)
    }
}
export default new AxiosService();