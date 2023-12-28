import { Schema, model } from "mongoose";

const MagnetogramSchema = new Schema({
  date: {type: Date},
  array: [{type: Number}],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  pipe: {type: Schema.Types.ObjectId, ref: 'Pipe'}
})

export default model('Magnetogram', MagnetogramSchema);