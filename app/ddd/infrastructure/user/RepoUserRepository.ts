import { signIn } from "next-auth/react";

import { UserRepository } from "../../domain/user/UserRepository";

//[use case] Infrastructure Layer
export class UserRepositoryImpl implements UserRepository {
  async findOneUser(username: string, password: string) {
    const singinResult = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    return singinResult;
  }

  async insertUser(
    username: string,
    password: string,
    name: string | null
  ): Promise<any> {
    const insertResult = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name }),
    });

    return new Promise((resolve, reject) => {
      if (insertResult.ok) {
        resolve(insertResult);
      } else {
        reject(new Error("DB Insert Error"));
      }
    });
  }
}
