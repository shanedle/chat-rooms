import { useEffect } from "react";
import { AppProps } from "next/app";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "@/firebase/config";

import theme from "@/theme";

import { Auth } from "@/components/Auth";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastActive: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }

  if (!user) {
    return (
      <ChakraProvider resetCSS theme={theme}>
        <Auth />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
