import HomeStats from "@/components/HomeStats";
import Layout from "@/components/Layout";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">
            Hello there,
            <br />
            <b>{session?.user?.name}</b>
          </h1>
        </div>
        <div>
          <Image
            src={session?.user?.image}
            alt="User Image"
            width={48}
            height={48}
            className="rounded-full ring-2 p-1 ring-black"
          />
          <button className="pt-1 underline font-bold" onClick={signOut}>
            Log Out
          </button>
        </div>
      </div>
      <HomeStats />
    </Layout>
  );
}
