import MessageSkeleton from "../Components/MessageSkeleton"

import { MessageCircleDashed, UserPlus } from "lucide-react"

const Home = () => {
  return (
    <section id='home'>
      <div className="left p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-2xl">
            <MessageCircleDashed size={"24px"}/>
            Whispr
          </div>
          <UserPlus />
        </div>
        <div className="contacts flex items-center justify-center mt-5.5">
          Contacts
        </div>
      </div>
      <div className="right">
        <MessageSkeleton></MessageSkeleton>
      </div>
    </section>
  )
}

export default Home