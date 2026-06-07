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
  selectEmailStatus,
  selectAuthStatusMessage,
  setStatusMessage,
  selectMagicLinkTimestamp,
  setEmailStatus,
  verifyOTP,
  selectIsOtpScreen,
  selectPendingEmail,
  setPendingEmail,
  selectOtpStatus,
  resetAuth,
  selectIsOtpDisabled,
  setCredentials,
  selectIsOnBoarding
} from '../../store/slices/authSlice'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import validator from 'validator'
import {
  authScreenSlideVariants,
  authItemVariants,
} from '../../lib/variants'
import AppTextButton from '../../components/common/AppTextButton'

const MAGIC_LINK_COOLDOWN_MS = 60 * 1000

function Auth() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectAuthLoading)
  const loadingProvider = useAppSelector(selectLoadingProvider)
  const magicLinkTimestamp = useAppSelector(selectMagicLinkTimestamp)
  const emailStatus = useAppSelector(selectEmailStatus)
  const authStatusMessage = useAppSelector(selectAuthStatusMessage)
  const isOtpScreen = useAppSelector(selectIsOtpScreen)
  const pendingEmail = useAppSelector(selectPendingEmail)
  const otpStatus = useAppSelector(selectOtpStatus)
  const isOtpDisabled = useAppSelector(selectIsOtpDisabled)
  const isOnboarding = useAppSelector(selectIsOnBoarding)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (pendingEmail && emailRef.current) {
      emailRef.current.value = pendingEmail
    }
  }, [pendingEmail])

  useEffect(() => {
    dispatch(setLoadingProvider(null))
  }, [dispatch])


  const handleResendingTimer = (): [number, boolean] => {
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
          </div>

          {/* ── Animated screen content ── */}
          <div className="w-full flex flex-col items-center gap-3">
            <AnimatePresence mode="wait">
              {/* ── OTP screen ── */}
              {isOtpScreen ? (
                <OTPContent pendingEmail={pendingEmail} emailRef={emailRef} handleResendingTimer={handleResendingTimer} otpStatus={otpStatus} isOtpDisabled={isOtpDisabled} authStatusMessage={authStatusMessage} />
              ) : (
                <OAuthContent isLoading={isLoading} loadingProvider={loadingProvider} />
              )}
            </AnimatePresence>

            <MagicLinkContent emailRef={emailRef} handleResendingTimer={handleResendingTimer} isOtpScreen={isOtpScreen} emailStatus={emailStatus} authStatusMessage={authStatusMessage} isLoading={isLoading} loadingProvider={loadingProvider}/>


          </div>
        </div>
      </section>

      <AnimatedBackground />
      <FloatingIcons />
    </main>
  )
}


const OTPContent = ({ pendingEmail, emailRef, handleResendingTimer, otpStatus, isOtpDisabled, authStatusMessage }) => {
  const dispatch = useAppDispatch()

  const handleResend = async () => {
    const email = pendingEmail || emailRef.current?.value.trim()
    if (!email) return
    const [secondsLeft, check] = handleResendingTimer()
    if (secondsLeft !== null && check) {
      dispatch(setStatusMessage(`Please wait ${secondsLeft}s before resending`))
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

      />
    </motion.div>

    {/* Status message */}
    <AnimatePresence mode="wait">
      {authStatusMessage && (
        <motion.p
          key={authStatusMessage}
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
          {authStatusMessage}
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


const OAuthContent = ({ isLoading, loadingProvider }) => {
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

const MagicLinkContent = ({emailRef, handleResendingTimer, isOtpScreen, emailStatus, authStatusMessage, isLoading, loadingProvider}) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const inputEl = emailRef.current
    if (!inputEl) return

    const handleNativeInput = () => {
      if (emailStatus !== 'idle' || authStatusMessage) {
        dispatch(setEmailStatus('idle'))
        dispatch(setStatusMessage(null))
      }
      inputEl.removeEventListener('input', handleNativeInput)
    }

    inputEl.addEventListener('input', handleNativeInput)
    return () => inputEl.removeEventListener('input', handleNativeInput)
  }, [emailStatus, authStatusMessage, dispatch])

  const handleMagicLink = async () => {
    const val = emailRef.current?.value.trim()

    if (!val) {
      dispatch(setEmailStatus('error'))
      dispatch(setStatusMessage('Email is required'))
      return
    }

    if (!validator.isEmail(val)) {
      dispatch(setEmailStatus('error'))
      dispatch(setStatusMessage('Please enter a valid email'))
      return
    }
    const [secondsLeft, check] = handleResendingTimer()
    if (secondsLeft !== null && check) {
      dispatch(setEmailStatus('error'))
      dispatch(setStatusMessage(`Please wait ${secondsLeft}s before trying again`))
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
      message={!isOtpScreen ? authStatusMessage : null}
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


const OnBoardingContent = () => {
  return <></>
}


export default Auth