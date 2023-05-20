import tw, { styled } from 'twin.macro'
import { useAppData } from '../App'

export default function Home() {
  const user = useAppData()
  const chats = [
    { name: 'Tim', message: 'Hello' },
    { name: 'Gavin', message: 'Hi' },
    { name: 'Tim', message: 'How are you?' },
    { name: 'AI', message: 'Good, you?' },
  ]
  return (
    <HomeWrapper>
      <ChatBox>
        {chats.map((chat, index) => {
          const myMessage = index % 2 === 0 //user.uid === chat.uid

          return (
            <MessageBox key={index} myMessage={myMessage}>
              {myMessage ? (
                <>
                  <ProfileInfo>
                    <Name>{chat.name}</Name>
                    <Pfp src='' alt='' />
                  </ProfileInfo>

                  <Message myMessage={myMessage}>{chat.message}</Message>
                </>
              ) : (
                <>
                  <ProfileInfo>
                    <Pfp src='' alt='' />
                    <Name>{chat.name}</Name>
                  </ProfileInfo>
                  <Message myMessage={myMessage}>{chat.message}</Message>
                </>
              )}
            </MessageBox>
          )
        })}
      </ChatBox>
      <DraftMessage>
        <InputBox />
        <SendButton>Send</SendButton>
      </DraftMessage>
    </HomeWrapper>
  )
}

const HomeWrapper = tw.div`flex flex-col items-center justify-center h-full p-4 max-w-6xl gap-2 sm:p-6 md:p-10 lg:p-20`
const ChatBox = tw.div`flex flex-col rounded-lg shadow-lg bg-white border border-gray-300 min-h-[70%] w-full h-full p-6 gap-1`
const DraftMessage = tw.div`flex gap-2 w-full`
const InputBox = tw.input`rounded-lg p-2 w-full`
const SendButton = tw.button`px-4 py-1 bg-white border border-gray-300 rounded-lg text-lg transition-all duration-300 hover:bg-gray-100`
const MessageBox = styled.div(({ myMessage }) => [
  tw`flex flex-col  gap-2 max-w-[80%] w-fit rounded-lg`,
  myMessage ? tw`ml-auto items-end` : tw`mr-auto items-start`,
])
const Name = tw.span`text-sm text-center`
const Pfp = tw.img`rounded-full w-8 h-8 `
const Message = styled.p(({ myMessage }) => [
  tw`text-white text-sm rounded-t-2xl py-2 px-3 flex items-center justify-center`,
  myMessage
    ? tw`bg-green-500 rounded-bl-2xl ml-auto`
    : tw`bg-blue-500 rounded-br-2xl mr-auto`,
])
const ProfileInfo = tw.div`flex gap-2 items-center`
