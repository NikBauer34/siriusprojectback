import { Schema, model } from "mongoose";

const MagnetogramSchema = new Schema({
  title: String,
  info: [{
    version: {type: String},
    markup: [{type: Number}],
    defects_count: {type: Number},
    date: {type: Date},
  }],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  pipe: {type: Schema.Types.ObjectId, ref: 'Pipe'}
})

export default model('Magnetogram', MagnetogramSchema);