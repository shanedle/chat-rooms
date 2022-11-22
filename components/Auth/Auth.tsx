import { useState } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Icon,
  Input,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

import { auth, provider } from "@/lib/firebase";

import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export const Auth = () => {
  const [isMobile] = useMediaQuery("(max-width: 960px)");
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.100", dark: "gray.800" };
  const bgAuth = { light: "white", dark: "gray.700" };

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [signUp, setSignUp] = useState(false);

  const googleSignIn = () => {
    isMobile
      ? signInWithRedirect(auth, provider).catch(alert)
      : signInWithPopup(auth, provider).catch(alert);
  };

  const emailAndPasswordSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const guestSignIn = () => {
    signInAnonymously(auth).catch((error) => {
      console.log(error.message);
    });
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPass(e.target.value);
    }
  };
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={bgColor[colorMode]}
    >
      <Flex
        shadow={colorMode === "light" ? "lg" : "dark-lg"}
        h="100vh"
        w="auto"
        direction={isMobile ? "column" : "row"}
      >
        <Image w="100vw" src="/undraw_chat.svg" alt="Undraw Chat" />
        <Flex
          direction="column"
          paddingY="20px"
          paddingX="40px"
          bg={bgAuth[colorMode]}
          justify="center"
          align="center"
          w="100%"
          h="100%"
        >
          <Heading
            position="relative"
            bottom={isMobile ? "7%" : "14%"}
            size="lg"
            textAlign="center"
          >
            Let's Chat
          </Heading>
          <Input
            type="text"
            name="email"
            onChange={handleChange}
            size={isMobile ? "md" : "lg"}
            placeholder="Email"
            variant="flushed"
            height="2rem"
            mb="10px"
          />
          <Input
            type="password"
            name="pass"
            onChange={handleChange}
            size={isMobile ? "md" : "lg"}
            placeholder="Password"
            variant="flushed"
            height="2rem"
            mb="10px"
          />

          <>
            <Flex w="100%" mt="10px" mb="10px" justify="center">
              {signUp ? (
                <Button
                  onClick={createUser}
                  borderRadius="20px"
                  w="100%"
                  size={{ base: "sm", md: "md" }}
                >
                  Sign Up
                </Button>
              ) : (
                <>
                  <Button
                    onClick={emailAndPasswordSignIn}
                    borderRadius="20px"
                    w="100%"
                    size={{ base: "sm", md: "md" }}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </Flex>
            <Stack mt="15px" mb="15px" direction="row" w="75%" align="center">
              <Divider color="white" />
              <Text>Or</Text>
              <Divider />
            </Stack>
            <Flex
              w="100%"
              mt="10px"
              mb="10px"
              gap="4"
              direction={{ base: "column", md: "row" }}
            >
              <Button
                onClick={googleSignIn}
                leftIcon={<IoLogoGoogle />}
                borderRadius="20px"
                w="100%"
                size={{ base: "sm", md: "md" }}
              >
                Sign in with Google
              </Button>
              <Button
                onClick={guestSignIn}
                borderRadius="20px"
                w="100%"
                size={{ base: "sm", md: "md" }}
              >
                Sign in as Guest
              </Button>
            </Flex>

            <Flex mt="15px">
              <Text fontSize="sm">
                {signUp ? "Already have an account?" : "Don't have an account?"}{" "}
              </Text>
              <Text
                onClick={() => setSignUp(!signUp)}
                cursor="pointer"
                _hover={{ color: "orange" }}
                decoration="underline"
                fontSize="sm"
                ml="5px"
              >
                {signUp ? "Sign in" : "Sign up"}
              </Text>
            </Flex>
          </>
        </Flex>
      </Flex>
      <ThemeToggleButton />
    </Flex>
  );
};
