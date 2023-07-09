import userModel from '../../models/user/userModel';
import bcrypt from 'bcryptjs';

const userExistsService = async (email: string, withPass = false) => {
  const query = userModel.findOne({ email });

  if (!withPass) {
    query.select('-password');
  }

  const user = await query.exec();

  if (!user) {
    return false;
  }

  return user;
};

const userPasswordService = async (input: string, password: string) => {
  return await bcrypt.compare(input, password);
};

const registerUserService = async (firstName: string, lastName: string, email: string, password: string) => {
  const checkUser = await userExistsService(email);

  if (checkUser) {
    return false;
  }

  const createUser = await userModel.create({ firstName, lastName, email, password });

  if (createUser) {
    return {
      _id: createUser.id,
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      email: createUser.email,
    };
  } else {
    return false;
  }
};

const loginUserService = async (email: string, password: string) => {
  const user = await userExistsService(email, true);

  if (!user) {
    return false;
  }

  const checkPass = await userPasswordService(password, user.password);

  if (!checkPass) {
    return false;
  }

  return {
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

export { registerUserService, loginUserService, userExistsService };
