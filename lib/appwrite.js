import { Account, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfing = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.SE.ImamFinance",
  projectId: "66b7d5870019298a6459",
  databaseId: "66b7d6fd000b9ae64e71",
  userCollectionId: "66b7d70e002318a9c70a",
  walletCollectionId: "66b7d7390032a1301ee2",
  storageId: "66b7da41003d1338b744",
};

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

client
  .setEndpoint(appwriteConfing.endpoint)
  .setProject(appwriteConfing.projectId)
  .setPlatform(appwriteConfing.platform);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error();
    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfing.databaseId,
      appwriteConfing.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    await account.deleteSession("current");
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
