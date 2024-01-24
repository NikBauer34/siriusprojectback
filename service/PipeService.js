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
    return pipe
  }
  async getPipeStatistics(pipe_id) {
    console.log('data')
    console.log(pipe_id)
    const pipe = await PipeModel.findById(pipe_id)
    if (!pipe) {
      throw ApiError.BadRequest('Не найдена труба')
    }
    const data = [
      { month: 'Январь', defects: 0 },
      { month: 'Февраль', defects: 0 },
      { month: 'Март', defects: 0 },
      { month: 'Апрель', defects: 0 },
      { month: 'Май', defects: 0 },
      { month: 'Июнь', defects: 0 },
      { month: 'Июль', defects: 0 },
      { month: 'Август', defects: 0 },
      { month: 'Сентябрь', defects: 0 },
      { month: 'Октябрь', defects: 0 },
      { month: 'Ноябрь', defects: 0 },
      { month: 'Декабрь', defects: 0 }
    ]
    let magnetogramData, magnetogramMonth;
    for (let magnetogram of pipe.magnetograms) {
      magnetogramData = await MagnetogramService.getMagnetogram(magnetogram)
      magnetogramMonth = magnetogramData.info[0].date.getMonth()
      console.log(magnetogramMonth)
      data[magnetogramMonth].defects += magnetogramData.info[0].defects_count
    }
    console.log(data)
    return data
  }
  async getPipeByUserId(user_id) {
    const user = await UserModel.findById(user_id)
    if (!user) {
      throw ApiError.BadRequest('Не найден пользователь')
    }
    console.log('Here')
    let userpipes = []
    for (let pipe in user.pipes) {
      let userpipe = await PipeModel.findById(user.pipes[Number(pipe)])
      userpipes.push(userpipe)
    }
    console.log(userpipes)
    return userpipes
  }
  async getAllPipes() {
    const pipes = await PipeModel.find({})
    if (!pipes) {
      throw ApiError.BadRequest('Не найдены трубы')
    }
    return pipes
  }
  async createPipe(location, title, user_id) {
    const pipe = await PipeModel.create({ location, title, magnetograms: [], users: [] })
    const user = await UserModel.findById(user_id)
    //console.log(pipe)
    // if (user.pipe[0] == pipe._id) {
    //   throw ApiError.BadRequest('У пользователя уже есть труба')
    // }
    user.pipes.push(pipe._id)
    pipe.users.push(user._id)
    await UserModel.findByIdAndUpdate(user._id, user)
    await PipeModel.findByIdAndUpdate(pipe._id, pipe)
    console.log(pipe)
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
    console.log(pipe_id)
    const pipe = await PipeModel.findById(pipe_id)
    console.log(pipe)
    pipe.magnetograms.push(magnetogram_id)
    const new_pipe = await PipeModel.findByIdAndUpdate(pipe_id, pipe)
    return new_pipe
  }
}
export default new PipeService()