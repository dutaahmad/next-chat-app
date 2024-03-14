import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { ModeToggle } from "~/components/mode-toggle";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
    noStore();
    const hello = await api.post.hello.query({ text: "from tRPC" });
    const session = await getServerAuthSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <section className="flex gap-4 items-center">
                <ModeToggle />
                <h1>Hello Guest</h1>
            </section>
        </main>
    );
}
