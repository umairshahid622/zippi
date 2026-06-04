import AuthHeader from "../../components/auth/AuthHeader"
import { GoogleIcon, HandIcon, GitHubIcon } from "../../components/icons"
import { projectName } from "../../constants/constants"
import { AnimatedBackground } from "../../components/auth/AnimatedBackground"
import { FloatingIcons } from "../../components/auth/FloatingIcons"
import AppButton from "../../components/common/AppButton"
import { AppInput } from "../../components/common/AppInput"
import MailIcon from "../../components/icons/MailIcon"
import ArrowExpandButton from "../../components/common/ArrowExpandButton"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { selectAuthLoading, selectLoadingProvider, sendMagicLink, setLoadingProvider, selectEmailStatus, selectAuthStatusMessage, setStatusMessage, selectMagicLinkTimestamp,setEmailStatus } from "../../store/slices/authSlice"
import { useEffect, useRef } from "react"
import validator from 'validator'

function Auth() {

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectAuthLoading)
  const loadingProvider = useAppSelector(selectLoadingProvider)
  const magicLinkTimestamp = useAppSelector(selectMagicLinkTimestamp);
  const emailStatus = useAppSelector(selectEmailStatus);

  const isAnyLoading = isLoading || loadingProvider !== null

  const handleGoogleAuth = () => {
    if (isAnyLoading) return              // ← hard block
    dispatch(setLoadingProvider('google'))
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  const handleGithubAuth = () => {
    if (isAnyLoading) return              // ← hard block
    dispatch(setLoadingProvider('github'))
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`
  }
  // const [emailStatus, setEmailStatus] = useState<InputProps['status']>('idle')

  const handleMagicLink = async () => {
    const val = emailRef.current?.value.trim();

    if (!val) {
      dispatch(setEmailStatus('error'))
      dispatch(setStatusMessage('Email is required'))
      return;
    };
    
    setEmailStatus('idle')
    // Manual Validation
    if (!validator.isEmail(val)) {
      dispatch(setEmailStatus('error'))
      dispatch(setStatusMessage('Please Enter a valid email'))
      return;
    }

    const COOLDOWN_MS = 60000;
    if (magicLinkTimestamp && Date.now() - magicLinkTimestamp < COOLDOWN_MS) {

      dispatch(setEmailStatus('error'))
      dispatch(setStatusMessage(`Please wait for at least 60s before trying again`));
      return;
    }

    await dispatch(sendMagicLink(val));
  };


  const emailRef = useRef<HTMLInputElement>(null);

  const authStatusMessage = useAppSelector(selectAuthStatusMessage)


  useEffect(() => {
    dispatch(setLoadingProvider(null));
    dispatch(setStatusMessage(null)); // Clear the message from Redux
    dispatch(setEmailStatus('idle'))
  }, [dispatch]);


  // useEffect(() => {
  //   if (authStatus === 'success') {
  //     setEmailStatus('success');
  //   } else if (authStatus === 'error') {
  //     setEmailStatus('error');
  //   } else if (authStatus === 'idle') {
  //     setEmailStatus('idle');
  //   }
  // }, [authStatus]);


  useEffect(() => {
    const inputEl = emailRef.current;
    if (!inputEl) return;

    const handleNativeInput = () => {
      // Check if we actually need to reset
      if (emailStatus !== 'idle' || authStatusMessage) {
        dispatch(setEmailStatus('idle'))
        dispatch(setStatusMessage(null));
      }
      // Self-destruct the listener so it doesn't run on subsequent keystrokes
      inputEl.removeEventListener('input', handleNativeInput);
    };

    inputEl.addEventListener('input', handleNativeInput);

    // Clean up if the component unmounts
    return () => inputEl.removeEventListener('input', handleNativeInput);
  }, [emailStatus, authStatusMessage, dispatch]);

  console.log("Building Auth");


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
            <AppButton isLoading={loadingProvider === 'google'} icon={<GoogleIcon />} label="Continue With Google" isDisabled={isAnyLoading} onCallBack={handleGoogleAuth} />
            <AppButton isLoading={loadingProvider === 'github'} icon={<GitHubIcon />} label="Continue With GitHub" isDisabled={isAnyLoading} onCallBack={handleGithubAuth} />
            <div className="flex w-full items-center">
              <div className="grow app-divider" />
              <span className="shrink-0 mx-4 text-muted text-xs font-medium">Prefer Email Instead ?</span>
              <div className="grow app-divider" />
            </div>
            <AppInput
              ref={emailRef} // Pass the ref here (Ensure your AppInput supports refs)
              status={emailStatus}
              placeholder="Enter your email"
              label="Email Address"
              icon={<MailIcon />}
              message={authStatusMessage}
            />
            <ArrowExpandButton isLoading={isLoading} isDisabled={isAnyLoading} label={"Send Magic Link"} onCallBack={handleMagicLink} />
          </div>

        </div>
      </section>
      <AnimatedBackground />
      <FloatingIcons />
    </main>
  )
}

export default Auth