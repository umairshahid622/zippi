import { projectName } from '../../constants/data';
import { MessageIcon } from '../icons';

function AuthHeader() {
  return (
    <nav className='flex items-center p-6 gap-2'>
      <div className='inline-flex items-center justify-between message-icon-bg'>
        <MessageIcon color='var(--text-color)' />
      </div>
      <h1>
        {projectName}
      </h1>
    </nav>
  )
}

export default AuthHeader;