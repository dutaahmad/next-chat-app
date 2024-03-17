import { redirect } from "next/navigation";
import SampleChatPage from "~/components/SampleChatPage";
import { getServerAuthSession } from "~/server/auth";


const ChatPage = async () => {
    const session = await getServerAuthSession();
    if (!session) redirect("/api/auth/signin")
    return (
        <main className="flex min-h-screen flex-col gap-8 w-full">
            <SampleChatPage />
        </main>
    )
}

export default ChatPage