import AuthHeader from '../../components/auth/AuthHeader'
import { GoogleIcon, HandIcon, GitHubIcon } from '../../components/icons'
import { projectName } from '../../constants/constants'
import { AnimatedBackground } from '../../components/auth/AnimatedBackground'
import { FloatingIcons } from '../../components/auth/FloatingIcons'
import AppButton from '../../components/common/AppButton'
import { AppInput } from '../../components/common/AppInput'
import MailIcon from '../../components/icons/MailIcon'
import ArrowExpandButton from '../../components/common/ArrowExpandButton'
import { OTPInput } from '../../components/auth/OTPInput'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectAuthLoading,
  selectLoadingProvider,
  sendMagicLink,
  setLoadingProvider,


  //email

  selectEmailStatus,
  selectEmailStatusMessage,
  setEmailStatusMessage,
  setEmailStatus,

  // otp
  selectOtpStatusMessage,
  setOtpStatusMessage,
  selectOtpStatus,


  // usernames
  selectUserNameStatusMessage,
  setUserNameStatusMessage,
  selectUserNameStatus,
  setUserNameStatus,

  selectMagicLinkTimestamp,
  verifyOTP,
  selectIsOtpScreen,
  selectPendingEmail,
  setPendingEmail,  
  resetAuth,
  selectIsOtpDisabled,
  selectIsNewUser,
  updateProfile,
  selectIsAuthenticated,
  setShowOnBoardingScreen,
  selectShowOnboardingScreen,
  clearAwaitingOtpAnimation,
} from '../../store/slices/authSlice'
import { useEffect, useRef} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import validator from 'validator'
import {
  authScreenSlideVariants,
  authItemVariants,
} from '../../lib/variants'
import AppTextButton from '../../components/common/AppTextButton'
import type { AuthLoadingProvider } from '../../types/types'

const MAGIC_LINK_COOLDOWN_MS = 60 * 1000

function Auth() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectAuthLoading)
  const loadingProvider = useAppSelector(selectLoadingProvider)
  const isOtpScreen = useAppSelector(selectIsOtpScreen)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const showOnboardingScreen = useAppSelector(selectShowOnboardingScreen)

  const magicLinkTimestamp = useAppSelector(selectMagicLinkTimestamp)



  const emailRef = useRef<HTMLInputElement>(null)

  const isNewUser = useAppSelector(selectIsNewUser)


  useEffect(() => {
    dispatch(setLoadingProvider(null))
  }, [dispatch])


  const handleResendingTimer = (): [number | null, boolean] => {
    if (
      magicLinkTimestamp &&
      Date.now() - magicLinkTimestamp < MAGIC_LINK_COOLDOWN_MS
    ) {
      const secondsLeft = Math.ceil(
        (MAGIC_LINK_COOLDOWN_MS - (Date.now() - magicLinkTimestamp)) / 1000
      )

      return [secondsLeft, true]
    }
    return [null, false];
  }


  console.log("AUTH BUILDING");
  const currentScreen = showOnboardingScreen
    ? 'onboarding'
    : isOtpScreen
      ? 'otp'
      : 'signin'

      

  return (
    <main className="flex flex-col h-screen relative max-w-7xl mx-auto">
      <AuthHeader />

      <section className="flex items-center justify-center flex-1 px-6">
        <div className="glass-card w-full max-w-md mx-auto flex flex-col items-center justify-center gap-6">

          {/* ── Header — always visible ── */}
          <div className="w-full flex flex-col items-center gap-2">
            <HandIcon size={80} />
            <h1>Welcome to {projectName}!</h1>
            <p className="text-muted">
              Your team is waiting for you — let's go 🚀
            </p>

            {/* <p>{currentScreen} | {isAuthenticated ? 'Authenticated' : 'Not Authenticated'} | {isNewUser ? 'New User' : 'Existing User'}</p> */}
          </div>

          {/* ── Animated screen content ── */}
          <div className="w-full flex flex-col items-center gap-3">
            <AnimatePresence mode="wait">
              {currentScreen === 'onboarding' && (
                <OnboardingContent key="onboarding-screen" />
              )}
``
              {currentScreen === 'otp' && (
                <OTPContent
                  key="otp-screen"
                  emailRef={emailRef as React.RefObject<HTMLInputElement>}
                  handleResendingTimer={handleResendingTimer}
                  onSuccessAnimationComplete={() => {
                    if (isAuthenticated && isNewUser) {
                        dispatch(setShowOnBoardingScreen(true))
                    } else if (isAuthenticated && !isNewUser) {
                        dispatch(clearAwaitingOtpAnimation())
                    }
                  }}
                />
              )}

              {currentScreen === 'signin' && (
                <OAuthContent
                  key="signin-screen"
                  isLoading={isLoading}
                  loadingProvider={loadingProvider}
                />
              )}

            </AnimatePresence>
            {currentScreen !== 'onboarding' && (
              <MagicLinkContent
                emailRef={emailRef as React.RefObject<HTMLInputElement>}
                handleResendingTimer={handleResendingTimer}
                isOtpScreen={isOtpScreen}
                isLoading={isLoading}
                loadingProvider={loadingProvider}
              />
            )}
            {/* <MagicLinkContent emailRef={emailRef} handleResendingTimer={handleResendingTimer} isOtpScreen={isOtpScreen} authStatusMessage={authStatusMessage} isLoading={isLoading} loadingProvider={loadingProvider} /> */}

          </div>
        </div>
      </section>

      <AnimatedBackground />
      <FloatingIcons />
    </main>
  )
}


const OTPContent = ({ emailRef, handleResendingTimer, onSuccessAnimationComplete }: { emailRef: React.RefObject<HTMLInputElement>; handleResendingTimer: () => [number | null, boolean]; onSuccessAnimationComplete: () => void }) => {
  const dispatch = useAppDispatch()
  const isOtpDisabled = useAppSelector(selectIsOtpDisabled)
  const otpStatus = useAppSelector(selectOtpStatus)
  const pendingEmail = useAppSelector(selectPendingEmail)
  const otpStatusMessage = useAppSelector(selectOtpStatusMessage)

  useEffect(() => {
    if (pendingEmail && emailRef.current) {
      emailRef.current.value = pendingEmail
    }
  }, [pendingEmail])

  const handleResend = async () => {
    const email = pendingEmail || emailRef.current?.value.trim()
    if (!email) return
    const [secondsLeft, check] = handleResendingTimer()
    if (secondsLeft !== null && check) {
      dispatch(setOtpStatusMessage(`Please wait ${secondsLeft}s before resending`))
      return;
    }
    await dispatch(sendMagicLink(email))
  }

  const handleVerifyOtp = async (otp: string) => {
    const email = pendingEmail || emailRef.current?.value.trim()
    if (!email) return
    await dispatch(verifyOTP({ email, otp }))
  }

  const handleBackToSignIn = () => {
    dispatch(resetAuth())
  }

  return <motion.div
    key="otp-screen"
    className="w-full flex flex-col items-center gap-2"
    variants={authScreenSlideVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <motion.div
      custom={1}
      variants={authItemVariants}
      initial="hidden"
      animate="visible"
    >
      <OTPInput
        status={otpStatus}
        onComplete={handleVerifyOtp} disable={isOtpDisabled}
        onSuccessAnimationComplete={onSuccessAnimationComplete}
      />
    </motion.div>

    {/* Status message */}
    <AnimatePresence mode="wait">
      {otpStatusMessage && (
        <motion.p
          key={otpStatusMessage}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: 12,
            color: otpStatus === "error"
              ? "var(--color-error)"
              : otpStatus === "success"
                ? "var(--color-success)"
                : "var(--color-bubble)",
          }}
        >
          {otpStatusMessage}
        </motion.p>
      )}
    </AnimatePresence>

    {/* Resend link */}
    {
      otpStatus !== "success" && (

        <>

          <AppTextButton
            onCallBack={handleResend}
            label="Didn't get it? Resend code" />

          <AppTextButton
            onCallBack={handleBackToSignIn}
            label="Wrong email?"
            iconDirection='left'
          />

        </>
      )
    }

  </motion.div>
}


const OAuthContent = ({ isLoading, loadingProvider }:{ isLoading: boolean; loadingProvider: AuthLoadingProvider }) => {
  const dispatch = useAppDispatch()
  const isAnyLoading = isLoading || loadingProvider !== null
  const handleOAuthLogin = (provider: 'google' | 'github') => {
    if (isAnyLoading) return
    dispatch(setLoadingProvider(provider))
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`
  }
  return (

    <motion.div
      key="signin-screen"
      className="w-full flex flex-col items-center gap-3"
      variants={authScreenSlideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        custom={0}
        variants={authItemVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <AppButton
          isLoading={loadingProvider === 'google'}
          icon={<GoogleIcon />}
          label="Continue With Google"
          isDisabled={isAnyLoading}
          onCallBack={() => handleOAuthLogin('google')}
        />
      </motion.div>

      <motion.div
        custom={1}
        variants={authItemVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <AppButton
          isLoading={loadingProvider === 'github'}
          icon={<GitHubIcon />}
          label="Continue With GitHub"
          isDisabled={isAnyLoading}
          onCallBack={() => handleOAuthLogin('github')}
        />
      </motion.div>

      <motion.div
        custom={2}
        variants={authItemVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex items-center"
      >
        <div className="grow app-divider" />
        <span className="shrink-0 mx-4 text-muted text-xs font-medium">
          Prefer Email Instead ?
        </span>
        <div className="grow app-divider" />
      </motion.div>
    </motion.div>

  )
}

const MagicLinkContent = ({ emailRef, handleResendingTimer, isOtpScreen, isLoading, loadingProvider }: { emailRef: React.RefObject<HTMLInputElement>; handleResendingTimer: () => [number | null, boolean]; isOtpScreen: boolean; isLoading: boolean; loadingProvider: string | null }) => {
  const dispatch = useAppDispatch()
  const emailStatus = useAppSelector(selectEmailStatus)
  const emailStatusMessage = useAppSelector(selectEmailStatusMessage)
  useEffect(() => {
    const inputEl = emailRef.current
    if (!inputEl) return

    const handleNativeInput = () => {
      if (emailStatus !== 'idle' || emailStatusMessage) {
        dispatch(setEmailStatus('idle'))
        dispatch(setEmailStatusMessage(null))
      }
      inputEl.removeEventListener('input', handleNativeInput)
    }

    inputEl.addEventListener('input', handleNativeInput)
    return () => inputEl.removeEventListener('input', handleNativeInput)
  }, [emailStatus, emailStatusMessage, dispatch])

  const handleMagicLink = async () => {
    const val = emailRef.current?.value.trim()

    if (!val) {
      dispatch(setEmailStatus('error'))
      dispatch(setEmailStatusMessage('Email is required'))
      return
    }

    if (!validator.isEmail(val)) {
      dispatch(setEmailStatus('error'))
      dispatch(setEmailStatusMessage('Please enter a valid email'))
      return
    }
    const [secondsLeft, check] = handleResendingTimer()
    if (secondsLeft !== null && check) {
      dispatch(setEmailStatus('error'))
      dispatch(setEmailStatusMessage(`Please wait ${secondsLeft}s before trying again`))
      return;
    }

    // ✅ Save email to Redux before dispatching
    dispatch(setPendingEmail(val))
    await dispatch(sendMagicLink(val))
  }
  return <>
    <AppInput
      ref={emailRef}
      status={emailStatus}
      placeholder="Enter your email"
      label="Email Address"
      disabled={isOtpScreen}
      icon={<MailIcon />}
      message={emailStatusMessage ?? ""}
    />
    {/* ── CTA button — always visible ── */}
    <motion.div
      className="w-full"
      animate={{
        opacity: isOtpScreen ? 0.4 : 1,
        scale: isOtpScreen ? 0.97 : 1,
      }}
      transition={{ duration: 0.25 }}
    >
      <ArrowExpandButton
        isLoading={isLoading}
        isDisabled={
          loadingProvider === 'google' ||
          loadingProvider === 'github' ||
          isOtpScreen
        }
        label="Send Email"
        onCallBack={handleMagicLink}
      />
    </motion.div>
  </>
}


const OnboardingContent = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectAuthLoading)
  const nameRef = useRef<HTMLInputElement>(null)
  // const authStatusMessage = useAppSelector(selectAuthStatusMessage)
  const usernameStatusMessage = useAppSelector(selectUserNameStatusMessage)
  const userNameStatus = useAppSelector(selectUserNameStatus)
  const pendingEmail = useAppSelector(selectPendingEmail)

  const getEmailInitials = (email: string, numberOfInitials: number) => {
    return email.split('@')[0].substring(0, numberOfInitials).toUpperCase()
  }

  const handleSaveProfile = async () => {
    const name = nameRef.current?.value.trim()

    if (!name || name.length < 2) {
      dispatch(setUserNameStatus('error'))
      dispatch(setUserNameStatusMessage('Please enter your name'))
      return
    }

    await dispatch(updateProfile({ fullName: name })) 
  }

  const handleSkip = () => {
    dispatch(updateProfile({ fullName: pendingEmail?.split('@')[0].substring(0, 5) || 'User' }))
  }

  return (
    <motion.div
      key="onboarding-screen"
      className="w-full flex flex-col items-center gap-4"
      variants={authScreenSlideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Avatar picker placeholder */}
      <motion.div
        custom={0}
        variants={authItemVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col items-center gap-2"
      >
        {/* Avatar circle — just initials for now */}
        <div
          className='size-17 rounded-full bg-blue-gradient shadow-blue-glow flex items-center justify-center text-h1 font-heading text-(--text-color) font-bold'        
        >
          {getEmailInitials(pendingEmail ?? "", 2)}
        </div>
        <p className="text-muted text-xs">
          You can add a photo later
        </p>
      </motion.div>

      {/* Name input */}
      <motion.div
        custom={1}
        variants={authItemVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <AppInput
          ref={nameRef}
          status={userNameStatus}
          placeholder="User Name"
          label="Your display name"
          message={ usernameStatusMessage ??""}
        />
      </motion.div>

      {/* Save button */}
      <motion.div
        custom={2}
        variants={authItemVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <ArrowExpandButton
          isLoading={isLoading}
          isDisabled={isLoading}
          label="Let's go"
          onCallBack={handleSaveProfile}
        />
      </motion.div>

      {/* Skip */}
      <motion.div
        custom={3}
        variants={authItemVariants}
        initial="hidden"
        animate="visible"
      >
        <AppTextButton
          label="Skip for now"
          onCallBack={handleSkip}
        />
        
      </motion.div>

    </motion.div>
  )
}


export default Auth