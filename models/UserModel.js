import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {type: String, unique: false},
  surname: {type: String, unique: false},
  nikname: {type: String, unique: true},
  password: {type: String, unique: false},
  role: {type: String, unique: false},
  requests: [{type: Schema.Types.ObjectId, ref: 'Request', unique: false, required: false}],
  pipe: [{type: Schema.Types.ObjectId, ref: 'Pipe', unique: false, required: false}]
})

export default model('User', UserSchema);