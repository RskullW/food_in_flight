import React from "react";
import {
  Box,
  Text,
  Wrap,
  WrapItem,
  Link,
  Button,
  Container,
  HStack
} from "@chakra-ui/react"
import { AiOutlineArrowLeft, AiOutlineMail } from "react-icons/ai"
import { SlSocialVkontakte } from "react-icons/sl"
import { FaTelegramPlane } from "react-icons/fa"

const Contacts = () => {
  return (
    <Box padding='40px'>
      <Link href={`${process.env.REACT_APP_FRONTEND_PROTOCOL_HOST}`}>
        <Button size='sm' leftIcon={<AiOutlineArrowLeft />} variant='ghost'>
          Главная
        </Button>
      </Link>
      <br />
      <Text as='b' fontSize='4xl'>Контакты</Text>
      <br />
      <br />
      <Wrap spacing='20px'>
        <WrapItem>
          <Container w='543px' h='auto' bg='gray.200' padding='30px'>
            <Text as='b' fontSize='md'>Project Manager & Mobile Developer</Text>
            <br />
            <Text fontSize='md'>Ковтун Антон Альбертович</Text>
            <Link href="https://vk.com/5fs4d3j2" isExternal>
              <Button leftIcon={<SlSocialVkontakte />} colorScheme='blue' variant='solid' size='sm'>
                ВКонтакте
              </Button>
            </Link>
            <Link href="https://t.me/rskullw" isExternal margin='10px'>
              <Button leftIcon={<FaTelegramPlane />} colorScheme='telegram' variant='solid' size='sm'>
                Telegram
              </Button>
            </Link>
          </Container>
        </WrapItem>
        <WrapItem>
          <Container w='543px' h='auto' bg='gray.200' padding='30px'>
            <Text as='b' fontSize='md'>Backend Developer</Text>
            <br />
            <Text fontSize='md'>Балкунов Сергей Иванович</Text>
            <Link href="https://vk.com/itm0sha" isExternal>
              <Button leftIcon={<SlSocialVkontakte />} colorScheme='blue' variant='solid' size='sm'>
                ВКонтакте
              </Button>
            </Link>
            <Link href="https://t.me/itmosha" isExternal margin='10px'>
              <Button leftIcon={<FaTelegramPlane />} colorScheme='telegram' variant='solid' size='sm'>
                Telegram
              </Button>
            </Link>
          </Container>
        </WrapItem>
        <WrapItem>
          <Container w='543px' h='auto' bg='gray.200' padding='30px'>
            <Text as='b' fontSize='md'>Backend Developer</Text>
            <br />
            <Text fontSize='md'>Базилевич Дмитрий Александрович</Text>
            <Link href="https://vk.com/pivolovepizdec" isExternal>
              <Button leftIcon={<SlSocialVkontakte />} colorScheme='blue' variant='solid' size='sm'>
                ВКонтакте
              </Button>
            </Link>
            <Link href="https://t.me/Pivondepula" isExternal margin='10px'>
              <Button leftIcon={<FaTelegramPlane />} colorScheme='telegram' variant='solid' size='sm'>
                Telegram
              </Button>
            </Link>
          </Container>
        </WrapItem>
        <WrapItem>
          <Container w='543px' h='auto' bg='gray.200' padding='30px'>
            <Text as='b' fontSize='md'>Frontend Developer</Text>
            <br />
            <Text fontSize='md'>Михайловский Никита Сергеевич</Text>
            <Link href="https://vk.com/mihalych32" isExternal>
              <Button leftIcon={<SlSocialVkontakte />} colorScheme='blue' variant='solid' size='sm'>
                ВКонтакте
              </Button>
            </Link>
            <Link href="https://t.me/xy19989" isExternal margin='10px'>
              <Button leftIcon={<FaTelegramPlane />} colorScheme='telegram' variant='solid' size='sm'>
                Telegram
              </Button>
            </Link>
          </Container>
        </WrapItem>
        <WrapItem>
          <Container w='543px' h='auto' bg='gray.200' padding='30px'>
            <Text as='b' fontSize='md'>Frontend Developer</Text>
            <br />
            <Text fontSize='md'>Кириллов Павел Евгеньевич</Text>
            <Link href="https://vk.com/id347879578" isExternal>
              <Button leftIcon={<SlSocialVkontakte />} colorScheme='blue' variant='solid' size='sm'>
                ВКонтакте
              </Button>
            </Link>
            <Link href="https://t.me/kpasshok" isExternal margin='10px'>
              <Button leftIcon={<FaTelegramPlane />} colorScheme='telegram' variant='solid' size='sm'>
                Telegram
              </Button>
            </Link>
          </Container>
        </WrapItem>
        <WrapItem>
          <Container w='543px' h='auto' bg='gray.200' padding='30px'>
            <Text as='b' fontSize='md'>DevOps</Text>
            <br />
            <Text fontSize='md'>Бусырев Виктор Андреевич</Text>
            <Link href="https://vk.com/vi350" isExternal>
              <Button leftIcon={<SlSocialVkontakte />} colorScheme='blue' variant='solid' size='sm'>
                ВКонтакте
              </Button>
            </Link>
            <Link href="https://t.me/just_yoy" isExternal margin='10px'>
              <Button leftIcon={<FaTelegramPlane />} colorScheme='telegram' variant='solid' size='sm'>
                Telegram
              </Button>
            </Link>
          </Container>
        </WrapItem>
      </Wrap>
      <Container w='543px' h='auto' bg='gray.200' padding='30px' marginTop='20px'>
        <Text as='b' fontSize='md'>Почта для предложений, отзывов, пожеланий:</Text>
        <br />
        <HStack spacing='10px'>
          <AiOutlineMail />
          <Text fontSize='md'>foodinflight@mail.ru</Text>
        </HStack>
      </Container>
    </Box>
  )
}

export default Contacts