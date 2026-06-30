
import { AnimatedBackground } from "../../components/auth/AnimatedBackground";
import SideBar from "../../components/workspace/SideBar";

export default function WorkSpace() {
  return (
    <main className="flex h-screen relative mx-auto overflow-x-hidden">
      <SideBar />
      <AnimatedBackground />
    </main>
  );
}
