import { unstable_noStore as noStore } from "next/cache";
import { Hello } from "~/components/hello";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
    noStore();
    const hello = await api.post.hello.query({ text: "from tRPC" });
    const session = await getServerAuthSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-8 ">
            <Hello session={session} />
            <h1>From TRPC : {hello.greeting}</h1>
        </main>
    );
}