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

  const createUser = await userModel.create({ firstName, lastName, email, password, emailConfirmed: false });

  if (createUser) {
    return {
      _id: createUser.id,
      firstName: createUser.firstName,
      lastName: createUser.lastName,
      email: createUser.email,
      emailConfirmed: createUser.emailConfirmed,
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

  if (!user.emailConfirmed) {
    throw new Error(
      'Please check your email inbox for further instructions to complete the confirmation process. Thank you!',
    );
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

const confirmUserService = async (email: string) => {
  const query = { email: email };
  const emailConfirmed = { emailConfirmed: true };

  try {
    await userModel.findOneAndUpdate(query, emailConfirmed);
  } catch (error) {
    throw new Error('Not able to authorize user');
  }
};

export { registerUserService, loginUserService, userExistsService, confirmUserService };
