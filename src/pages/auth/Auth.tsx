import AuthHeader from "../../components/auth/AuthHeader"
import { GoogleIcon, HandIcon, GitHubIcon } from "../../components/icons"
import { projectName } from "../../constants/constants"
import { AnimatedBackground } from "../../components/auth/AnimatedBackground"
import { FloatingIcons } from "../../components/auth/FloatingIcons"
import AppButton from "../../components/common/AppButton"
import { AppInput } from "../../components/common/AppInput"
import MailIcon from "../../components/icons/MailIcon"
import ArrowExpandButton from "../../components/common/ArrowExpandButton"

function Auth() {

  const onMagicLinkClick = () => {
    console.log("Magic link clicked");
  }

  return (
    <main className="flex flex-col h-screen relative max-w-7xl mx-auto">
      <AuthHeader />
      <section className="flex items-center justify-center flex-1 px-6">
        <div className="glass-card w-full max-w-md mx-auto flex flex-col items-center justify-center gap-6">
          <div className="w-full flex flex-col items-center gap-2">
            <HandIcon size={80} />
            <h1>Welcome to {projectName}!</h1>
            <p className="text-muted">Your team is waiting for you — let's go 🚀</p>
          </div>
          <div className="w-full flex flex-col items-center gap-3">
            <AppButton icon={<GoogleIcon />} label="Continue With Google" />
            <AppButton icon={<GitHubIcon />} label="Continue With GitHub" />
            <div className="flex w-full items-center">
              <div className="grow app-divider" />
              <span className="shrink-0 mx-4 text-muted text-xs font-medium">Prefer Email Instead ?</span>
              <div className="grow app-divider" />
            </div>
            <AppInput placeholder="Enter your email" label="Email Address" icon={<MailIcon />} />
            <ArrowExpandButton label={"Send magic link"} onCallBack={onMagicLinkClick} />
          </div>

        </div>
      </section>
      <AnimatedBackground />
      <FloatingIcons />
    </main>
  )
}

export default Auth