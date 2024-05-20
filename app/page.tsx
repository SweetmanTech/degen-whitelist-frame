import Attestations from "@/components/Attestations";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 pl-[10%] md:pl-[20%] pr-[20%] md:pr-[30%]">
      <div className="flex flex-col items-start gap-10 m-auto relative">
        <Header />
        <Attestations />
      </div>
    </main>
  );
}
