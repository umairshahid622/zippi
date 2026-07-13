import { useNavigate } from "react-router";
import AppTextButton from "../components/shared/AppTextButton";

export default function NotFound() {
  const navigate = useNavigate();

  const navigateToWorkSpace = () => {    
    navigate('/workspace', { replace: true }); 
  }
  return (
    <section className="flex flex-col items-center justify-center flex-1 px-6 h-screen gap-3">
      <h1 className="text-display">404 Not Found</h1>
      <p className="text-muted">The address you are trying to access is not found or removed.</p>
      <AppTextButton label="Go Back To Your Work Space" iconDirection="left" onCallBack={navigateToWorkSpace} />
    </section>
  )
}
