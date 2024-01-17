import ApiError from '../exceptions/api-error.js';
import PipeModel from '../models/PipeModel.js'
import UserModel from '../models/UserModel.js';
import MagnetogramService from './MagnetogramService.js';
class PipeService {
  async getPipe(id) {
    const pipe = await PipeModel.findById(id);
    if (!pipe) {
      throw ApiError.BadRequest('Не найдена труба')
    }
    return pipe
  }
  async newUserPipe(pipe_id, user_id) {
    const pipe = await PipeModel.findById(pipe_id);
    if (!pipe) {
      throw ApiError.BadRequest('Не найдена труба')
    }
    const user = await UserModel.findById(user_id)
    if (!user) {
      throw ApiError.BadRequest('Не найден пользователь')
    }
    pipe.users.push(user_id)
    user.pipes.push(pipe_id)
    await PipeModel.findByIdAndUpdate(pipe_id, pipe),
    await UserModel.findByIdAndUpdate(user_id, user)
    console.log(user, pipe)
  }
  async getPipeStatistics(pipe_id) {
    const pipe = await PipeModel.findById(pipe_id)
    if (!pipe) {
      throw ApiError.BadRequest('Не найдена труба')
    }
    const data = [
      {month: 'Январь', 'Дефекты': 0},
      {month: 'Февраль', 'Дефекты': 0},
      {month: 'Март', 'Дефекты': 0},
      {month: 'Апрель', 'Дефекты': 0},
      {month: 'Май', 'Дефекты': 0},
      {month: 'Июнь', 'Дефекты': 0},
      {month: 'Июль', 'Дефекты': 0},
      {month: 'Август', 'Дефекты': 0},
      {month: 'Сентябрь', 'Дефекты': 0},
      {month: 'Октябрь', 'Дефекты': 0},
      {month: 'Ноябрь', 'Дефекты': 0},
      {month: 'Декабрь', 'Дефекты': 0}
    ]
    let magnetogramData, magnetogramMonth;
    for (let magnetogram of pipe.magnetograms) {
      magnetogramData = await MagnetogramService.getMagnetogram(magnetogram)
      magnetogramMonth = magnetogramData.info[0].date.getMonth()
      data[magnetogramMonth]['Дефекты'] += magnetogramData.info[0].defects_count
    }
    return data
  }
  async getPipeByUserId(user_id) {
    const user = await UserModel.findById(user_id)
    if (!user) {
      throw ApiError.BadRequest('Не найден пользователь')
    }
    return user.pipes
  }
  async getAllPipes(){
    const pipes = await PipeModel.find({})
    if (!pipes) {
      throw ApiError.BadRequest('Не найдены трубы')
    }
    return pipes
  }
  async createPipe(location, title, user_id) {
    const pipe = await PipeModel.create({location})
    const user = await UserModel.findById(user_id)
    //console.log(pipe)
    // if (user.pipe[0] == pipe._id) {
    //   throw ApiError.BadRequest('У пользователя уже есть труба')
    // }
    user.pipes.push(pipe._id)
    pipe.users.push(user._id)
    await UserModel.findByIdAndUpdate(user._id, user)
    await PipeModel.findByIdAndUpdate(pipe._id, pipe)
    //console.log(user)
    return pipe
  }
  async newMember(pipe_id, user_id) {
    const pipe = await PipeModel.findById(pipe_id)
    pipe.users.push(user_id)
    const new_pipe = await PipeModel.findByIdAndUpdate(pipe_id, pipe)
    return new_pipe
  }
  async deletePipe(pipe_id) {
    const pipe = await PipeModel.findByIdAndDelete(pipe_id)
    if (!pipe) {
      throw ApiError.BadRequest('Не найдена труба')
    }
    return pipe
  }
  async newMagnetogram(pipe_id, magnetogram_id) {
    const pipe = await PipeModel.findById(pipe_id)
    pipe.magnetograms.push(magnetogram_id)
    const new_pipe = await PipeModel.findByIdAndUpdate(pipe_id, pipe)
    return new_pipe
  }
}
export default new PipeService()