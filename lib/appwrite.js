import { Account,Avatars,Client,Databases,ID, Query } from 'react-native-appwrite';

export const Config ={
    endpoint: 'https://cloud.appwrite.io/v1',
    platform:'com.jsm.aora',
    projectId: '667cac6c00335d792a39',
    databaseId: '667caf2c0037d8fccea2',
    userCollectionId: '667caf6100125296a475',
    videoCollectionId: '667cafa600172fcb7e60',
    storageId: '667cb20f001f2d2c6971'

}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(Config.endpoint) 
    .setProject(Config.projectId) 
    .setPlatform(Config.platform) 
;

const account = new Account(client);
const avatars= new Avatars(client);
const databases = new Databases(client);
    export const createUser=async (email,password,username) =>{
        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username
            )
            if (!newAccount) throw new Error ;
            const avatarUrl= avatars.getInitials(username)
            await signIn(email,password); 

            const newUser = await databases.createDocument(
                Config.databaseId,
                Config.userCollectionId,
                ID.unique(),
                {
                    accountID: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl
                }
            )
            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    export const signIn = async (email, password) => {
        try {
          const session = await account.createEmailPasswordSession(email, password);
      
          return session;
        } catch (error) {
          throw new Error(error);
        }
      }

      export const getCurrentUser = async ()=>{
        try {
            const currentAccount = await account.get();

            if(!currentAccount) throw Error ;

            const currentUser = await databases.listDocuments(
                Config.databaseId,
                Config.userCollectionId,
                [Query.equal('accoundId,' + currentAccount.$id)]
            )

            if(!currentUser) throw Error ;

            return currentUser.documents[0];
        } catch (error) {
            console.log(error);
        }
      }
