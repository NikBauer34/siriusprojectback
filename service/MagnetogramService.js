import ApiError from '../exceptions/api-error.js';
import MagnetogramModel from '../models/MagnetogramModel.js'
import PipeService from './PipeService.js';
class MagnetogramService {
  async getMagnetogram(id) {
    const magnetogram = await MagnetogramModel.findById(id);
    if (!magnetogram) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    return magnetogram
  }
  async getAllMagnetograms() {
    const pipes = await MagnetogramModel.find({});
    if (!pipes) {
      throw ApiError.BadRequest('Магнитограмм нет')
    }
    return pipes
  }
  async createMagnetogram(date, author, pipe_id, version, title) {
    const array = [1, 2, 3]
    const magnetogram = await MagnetogramModel.create({title, date, info: [{version, array}], author, pipe: pipe_id})
    const new_pipe = await PipeService.newMagnetogram(pipe_id, magnetogram._id)
    return magnetogram
  }
  async deleteMagnetogram(id) {
    const magnetogram = await MagnetogramModel.findByIdAndDelete(id)
    if (!magnetogram) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    return magnetogram
  }
}
export default new MagnetogramService()