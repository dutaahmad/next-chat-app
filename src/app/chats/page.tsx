import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";


const ChatPage = async () => {

    return (
        <div className="flex min-h-[91vh] flex-1 flex-col">
            <div className="grid h-full gap-4 border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex max-h-[5rem] items-center  gap-4">
                    <Avatar>
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <h3 className="text-base font-semibold">Sarah Day</h3>
                        <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                            Online
                        </p>
                    </div>
                </div>
                <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                        <p className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                            Hey, how&apos;s it going?
                        </p>
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                            2:14 PM
                        </time>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                            Not bad! Just finished my morning run. 🏃‍♀️
                        </p>
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                            2:15 PM
                        </time>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                            That&apos;s great! You&apos;re so dedicated. I&apos;m thinking
                            of starting to exercise more. Any tips?
                        </p>
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                            2:16 PM
                        </time>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                            Definitely! I suggest starting with some light cardio like
                            walking or cycling. And don&apos;t forget to stretch! 🧘‍♀️
                        </p>
                        <time className="text-xs text-gray-500 dark:text-gray-400">
                            2:17 PM
                        </time>
                    </div>
                </div>
            </div>
            <div className="flex items-end gap-4 p-4">
                <Input
                    className="flex-1"
                    placeholder="Type a message"
                    type="text"
                />
                <Button>Send</Button>
            </div>
        </div>
    )
}

export default ChatPage