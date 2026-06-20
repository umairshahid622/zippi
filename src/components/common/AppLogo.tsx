import { MessageIcon } from '../icons'

const AppLogo = ({ title }: { title: string }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className='inline-flex items-center justify-between bg-blue-gradient p-2 rounded-(--border-radius) shadow-blue-glow'>
                <MessageIcon color='var(--text-color)' className='size-6' />
            </div>
            <div className='relative box-border'>

                <h1 className='w-min inline'>
                    {title}
                </h1>
                <span className='absolute bg-blue-gradient size-2 rounded-full -right-4 top-0'></span>
            </div>
        </div>
    )
}

export default AppLogo