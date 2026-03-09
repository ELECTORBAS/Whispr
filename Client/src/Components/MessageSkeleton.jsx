import { MessageCircleDashed, Send } from "lucide-react"

const MessageSkeleton = () => {
  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center">
        <div className="flex gap-2.5 text-4xl items-center">
            <MessageCircleDashed size={'36px'} />
            Whispr
        </div>
        <div className="absolute w-[80%] h-11  bottom-5">
            <div className="w-full h-full border light-text rounded-2xl flex justify-center items-center cursor-pointer">
                <input type="text" className="w-[90%] h-full outline-0 "/> 
                <Send />
            </div>
        </div>
    </div>
  )
}

export default MessageSkeleton