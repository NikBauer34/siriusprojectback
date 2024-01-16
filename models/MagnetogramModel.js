import { Schema, model } from "mongoose";

const MagnetogramSchema = new Schema({
  date: {type: Date},
  info: {
    version: {type: String},
    markup: [[{type: Number}]],
  },
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  pipe: {type: Schema.Types.ObjectId, ref: 'Pipe'}
})

export default model('Magnetogram', MagnetogramSchema);