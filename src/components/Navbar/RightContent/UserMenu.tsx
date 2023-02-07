import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Icon,
  MenuDivider,
} from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import React from 'react';
import { auth } from '../../../firebase/clientApp';
import { authModalState } from '../../../atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        {user ? (
          <>
            <Icon fontSize={24} mr={1} color="gray.300" as={FaRedditSquare} />
            <Box
              display={{ base: 'none', lg: 'flex' }}
              flexDirection="column"
              fontSize="8pt"
              alignItems="flex-start"
              mr={8}
            >
              <Text fontWeight={700}>
                {user?.displayName || user?.email?.split('@')[0]}
              </Text>
              <Flex alignItems="center">
                <Icon as={IoSparkles} color="brand.100" mr={1} />
                <ChevronDownIcon />
              </Flex>
            </Box>
          </>
        ) : (
          <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
        )}
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'blue.500', color: 'white' }}
            >
              <Flex alignItems="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: 'blue.500', color: 'white' }}
              onClick={() => signOut(auth)}
            >
              <Flex alignItems="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize="10pt"
            fontWeight={700}
            _hover={{ bg: 'blue.500', color: 'white' }}
            onClick={() => setAuthModalState({ open: 'true', view: 'login' })}
          >
            <Flex alignItems="center">
              <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
              Login In / Sign Up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
