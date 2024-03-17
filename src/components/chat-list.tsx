import Link from "next/link";
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar";

const ChatList = () => {
    return (
        <div className="flex w-[20rem] flex-col border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="w-0 flex-1 font-semibold">Chats</div>
                <Button
                    className="h-8 w-8 rounded-full"
                    size="icon"
                    variant="ghost"
                >
                    <FileEditIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto">
                <div className="grid gap-2">
                    <Link
                        className="flex items-center gap-4 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
                        href="#"
                    >
                        <Avatar>
                            <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <div className="grid min-h-0 flex-1 gap-1.5">
                            <h3 className="truncate text-sm font-medium leading-none">
                                Sarah Day
                            </h3>
                            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                                Hey, how&apos;s it going?
                            </p>
                        </div>
                        <div className="flex min-w-14 flex-col items-end text-xs leading-none">
                            <time className="text-right">2:14 PM</time>
                        </div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default ChatList

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FileEditIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
        </svg>
    );
}