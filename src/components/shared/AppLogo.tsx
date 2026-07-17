import { projectName } from '../../constants/constants'
import { MessageIcon } from '../icon'

const AppLogo = () => {
    return (
        <div className='flex items-center gap-3'>
            <div className='inline-flex items-center justify-between bg-blue-gradient shadow-blue-glow p-2 rounded-(--border-radius)'>
                <MessageIcon color='var(--text-heading-color)' className='size-6' />
            </div>
            <div className='relative box-border'>

                <h1 className='w-min inline'>
                    {projectName}
                </h1>
                <span className='absolute bg-blue-gradient size-2 rounded-full -right-4 top-0'></span>
            </div>
        </div>
    )
}

export default AppLogo