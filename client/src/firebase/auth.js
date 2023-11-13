import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useContext, createContext, useEffect, useState} from 'react';
import axios from 'axios';


const firebaseConfig = {
  apiKey: "AIzaSyAxQIukd9otqJCpyC2_DSpt2aG2XRjk3sg",
  authDomain: "exchanger-8c2f8.firebaseapp.com",
  projectId: "exchanger-8c2f8",
  storageBucket: "exchanger-8c2f8.appspot.com",
  messagingSenderId: "804247435764",
  appId: "1:804247435764:web:d0555daea003eabfb6e1a1",
  measurementId: "G-FMSNPMW2QY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const storage = getStorage(app);
const storageRef = ref(storage);

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const PORT = process.env.REACT_APP_PORT;
  // const [userData, setUserData] = useState(null);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email
        };
        axios
          .get(`${PORT}users/`)
          .then((response) => {
            const users = response.data;
            const userFound = users.some((existingUser) => {
              return existingUser.uid === userData.uid && existingUser.email === userData.email;
            });
            if (!userFound) {
              axios
                .post(`${PORT}users/create`, userData)
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user}}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const UserAuth = () => {
  return useContext(AuthContext);
};


export const storeImage = async (userId, file, setUploadProgressCallback) => {
  const userStorageRef = ref(storageRef, `books/${userId}/${file.name}`);
  console.log(userId)
  const uploadTask = uploadBytesResumable(userStorageRef, file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgressCallback(progress);
    },
    (error) => {
      console.error(error);
    },
    () => {
      console.log('Upload complete!');
    }
  );

  await uploadTask;

  const downloadURL = await getDownloadURL(userStorageRef);

  return downloadURL;
};
