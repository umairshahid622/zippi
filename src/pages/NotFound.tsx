import AppButton from "../components/common/AppButton";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 px-6 h-screen gap-3">
      <h1 className="text-display">404 Not Found</h1>
      <p className="text-muted">The address you are trying to access is not found or removed.</p>
      <AppButton className="primary-gradient border-none" lable="Go To Your Work Space" />
    </section>
  )
}
