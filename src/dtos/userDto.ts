import * as yup from 'yup';

class UserDto {
  create = () =>
    yup.object().shape({
      name: yup.string().trim().min(5).max(30).required(),
      email: yup.string().email().required(),
    });
}

export { UserDto };
