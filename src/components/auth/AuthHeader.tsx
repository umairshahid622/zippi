import { projectName } from '../../constants/constants';
import AppLogo from '../common/AppLogo';

function AuthHeader() {
  return (
    <nav className='pt-6'>
      <AppLogo title={projectName}/>
    </nav>
  )
}

export default AuthHeader;