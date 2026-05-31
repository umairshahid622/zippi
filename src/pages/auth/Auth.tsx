import AuthHeader from "../../components/auth/AuthHeader"

function Auth() {
  return (
    <main className="flex flex-col h-screen">
      <AuthHeader />
      <section className="flex flex-col items-center justify-center flex-1">
        <div className="glass-card">
          <h1>Testing Heading</h1>
        </div>
      </section>
    </main>
  )
}

export default Auth