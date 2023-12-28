import ApiError from '../exceptions/api-error';
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
  async getAllMagnetograms(pipe_id) {
    const pipe = await MagnetogramModel.findById(pipe_id);
    return pipe.author
  }
  async createMagnetogram(date, author, pipe, pipe_id) {
    const array = [1, 2, 3]
    const magnetogram = await MagnetogramModel.create({date, array, author, pipe})
    const new_pipe = await PipeService.newMagnetogram(pipe_id, magnetogram._id)
    return new_pipe
  }
  async deleteMagnetogram(id) {
    const magnetogram = await MagnetogramModel.findByIdAndDelete(id)
    return magnetogram
  }
}
export default new MagnetogramService()