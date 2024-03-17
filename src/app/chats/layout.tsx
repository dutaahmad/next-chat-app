import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import AvatarGetter from "~/components/avatar-getter";
import ChatList from "~/components/chat-list";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerAuthSession();
    if (!session) redirect("/api/auth/signin");
    return (
        <div className="flex w-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                <Button
                    className=" h-10 w-10"
                    size="icon"
                    variant="ghost"
                    asChild
                >
                    <Link href={"/"}>
                        <ChevronLeftIcon className="h-5 w-5" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <header className="text-lg font-semibold">Messages</header>
                <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12">
                        <AvatarGetter session={session} />
                    </div>
                </div>
            </div>
            <div className="flex min-h-0 flex-1">
                <ChatList />
                {children}
            </div>
        </div>
    );
};

export default ChatLayout;
