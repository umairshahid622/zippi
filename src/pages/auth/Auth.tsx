import AuthHeader from "../../components/auth/AuthHeader"
import { HandIcon } from "../../components/icons"
import { projectName } from "../../constants/constants"
import { AnimatedBackground } from "../../components/auth/AnimatedBackground"
import { FloatingIcons } from "../../components/auth/FloatingIcons"

function Auth() {
  return (
    <main className="flex flex-col h-screen relative">
      <AuthHeader />
      <section className="flex flex-col items-center justify-center flex-1 px-6">
        <div className="glass-card w-full max-w-lg mx-auto flex flex-col items-center justify-center">
          <HandIcon size={100}/>
          <h1>Welcome to {projectName}!</h1>
        </div>
      </section>
      <AnimatedBackground />
      <FloatingIcons />
    </main>
  )
}

export default Auth