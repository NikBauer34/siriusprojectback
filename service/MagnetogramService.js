import ApiError from '../exceptions/api-error.js';
import MagnetogramModel from '../models/MagnetogramModel.js'
import PipeService from './PipeService.js';
class MagnetogramService {
  async getPipeMagnetograms(pipe_id) {
    const pipe = await PipeService.getPipe(pipe_id);
    if (!pipe.magnetograms) {
      throw ApiError.BadRequest('У трубы нет магнитограмм')
    }
    return pipe.magnetograms
  }
  async getAllMagnetograms() {
    const pipes = await MagnetogramModel.find({});
    if (!pipes) {
      throw ApiError.BadRequest('Магнитограмм нет')
    }
    return pipes
  }
  async createMagnetogram(author, pipe_id, version, title) {
    const array = [0, 1, 0]
    let defects_count = 0
    array.forEach(el => el == 0 ? defects_count++ : false)
    const magnetogram = await MagnetogramModel.create({title, info: [{version, array, defects_count, date: new Date()}], author, pipe: pipe_id})
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