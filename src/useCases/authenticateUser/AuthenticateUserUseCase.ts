import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";

interface IResquest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IResquest) {
    const userAlredyExists = await client.user.findFirst({
      where: {
        username,
      }
    });

    if (!userAlredyExists) {
      throw new Error('User or password incorrect!');
    }

    const passwordMatch = compare(password, userAlredyExists.password);

    if (!passwordMatch) {
      throw new Error('User or password incorrect!');
    }

    const token = sign({}, '909f521c-216d-43c7-8f5a-ae6c359b573e', {
      subject: userAlredyExists.id,
      expiresIn: '20s',
    });

    return { token };
  }
}

export { AuthenticateUserUseCase };

