import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth, firestore } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState('');

  const [createUserWithEmailAndPassword, userCred, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError('');
    if (!form.email.includes('@')) {
      return setFormError('Please enter a valid email');
    }
    if (form.password !== form.confirmPassword) {
      setFormError('Password do not match');
      return;
    }
    createUserWithEmailAndPassword(form.email, form.password);
  };

  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, 'users'),
      JSON.parse(JSON.stringify(user))
    );
  };
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <form onSubmit={onSumbit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg="gray.50"
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg="gray.50"
      />
      {
        <Text color="red" textAlign="center" fontSize="10pt">
          {formError ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      }
      <Button
        type="submit"
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'login',
            }))
          }
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
