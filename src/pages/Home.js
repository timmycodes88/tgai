import tw, { styled } from 'twin.macro'
import { useAppData } from '../App'
import ChatAPI from '../api/ChatAPI'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const user = useAppData()
  const autoScrollRef = useRef()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    return ChatAPI.listen(newMsg => setMessages(curr => [...curr, newMsg]))
  }, [])

  const sendMessage = async () => {
    if (!message) return
    ChatAPI.sendMessage(message)
    setMessage('')
  }

  useEffect(() => {
    autoScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <HomeWrapper>
      <ChatBox>
        {messages.map((chat, index) => {
          const myMessage = user.uid === chat.uid
          const lastMessageIsSameSender =
            index > 0 && messages[index - 1].uid === chat.uid
          const nextMessageIsSameSender = messages[index + 1]?.uid === chat.uid

          return (
            <MessageBox key={index} myMessage={myMessage}>
              {myMessage ? (
                <>
                  {!lastMessageIsSameSender && (
                    <ProfileInfo>
                      <Name>{chat.username}</Name>
                      <Pfp src={chat.image} alt='' />
                    </ProfileInfo>
                  )}

                  <Message
                    fullRounded={nextMessageIsSameSender}
                    myMessage={myMessage}
                  >
                    {chat.message}
                  </Message>
                </>
              ) : (
                <>
                  {!lastMessageIsSameSender && (
                    <ProfileInfo>
                      <Pfp src={chat.image} alt='' />
                      <Name>{chat.username}</Name>
                    </ProfileInfo>
                  )}
                  <Message
                    fullRounded={nextMessageIsSameSender}
                    myMessage={myMessage}
                  >
                    {chat.message}
                  </Message>
                </>
              )}
            </MessageBox>
          )
        })}
        <div ref={autoScrollRef} />
      </ChatBox>
      <DraftMessage>
        <InputBox
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder='Message or Command'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </DraftMessage>
    </HomeWrapper>
  )
}

const HomeWrapper = tw.div`flex flex-col items-center justify-center h-full p-4 max-w-6xl gap-2 sm:p-6 md:p-10 lg:p-20`
const ChatBox = tw.div`flex flex-col overflow-auto rounded-lg shadow-lg bg-white border border-gray-300 min-h-[70%] w-full h-full p-6 gap-1`
const DraftMessage = tw.div`flex gap-2 w-full`
const InputBox = tw.input`rounded-lg p-2 w-full`
const SendButton = tw.button`px-4 py-1 bg-white border border-gray-300 rounded-lg text-lg transition-all duration-300 hover:bg-gray-100`
const MessageBox = styled.div(({ myMessage }) => [
  tw`flex flex-col  gap-2 max-w-[80%] w-fit rounded-lg`,
  myMessage ? tw`ml-auto items-end` : tw`mr-auto items-start`,
])
const Name = tw.span`text-sm text-center`
const Pfp = tw.img`rounded-full w-8 h-8 `
const Message = styled.p(({ myMessage, fullRounded }) => [
  tw`text-white text-sm py-2 px-3 flex items-center justify-center leading-4`,
  myMessage ? tw`bg-green-500 ml-auto` : tw`bg-blue-500 mr-auto`,
  myMessage ? tw`rounded-bl-xl rounded-t-xl` : tw`rounded-br-xl rounded-t-xl`,
  fullRounded && tw`rounded-xl`,
])
const ProfileInfo = tw.div`flex gap-2 items-center mt-4`
