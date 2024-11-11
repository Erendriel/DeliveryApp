import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";

const { removeUser } = new UserLocalRepositoryImpl();

export const RemoveUserLocalUseCase = async () => {
  return await removeUser();
};
