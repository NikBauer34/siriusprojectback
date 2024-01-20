import axios from "axios";
import FormData from "form-data";
class AxiosService {
    async getMarkup(file, file_name) {
        const form = new FormData()
        form.append('magnetogram', file, file_name)
        const response = await axios.post(`${process.env.MODEL_URL}/get_markup`, form)
        return response
    }
}
export default new AxiosService()