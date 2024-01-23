export default class UserDto {
  user_id;
  name;
  surname;
  nikname;
  role;
  constructor(model) {
    this.user_id = model._id;
    this.name = model.name;
    this.surname = model.surname;
    this.nikname = model.nikname;
    this.role = model.role;
  }
}