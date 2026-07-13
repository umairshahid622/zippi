// components/ModalManager.tsx
import { useSelector, useDispatch } from 'react-redux';
import CreateWorkspaceModal from './modals/CreateWorkspaceModal';
import { closeModal } from '../../store/slices/uiSlice';
import type { RootState } from '../../store';
import type { ModalType } from '../../types/types';

const MODAL_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
    CREATE_WORKSPACE_MODAL: CreateWorkspaceModal,
};

export const ModalManager = () => {
    const activeModel: ModalType = useSelector((state: RootState) => state.ui.activeModal);
    if (activeModel === null) return null;
    const dispatch = useDispatch();
    console.log("Modal Manager Opened");
    

    const SpecificModal = MODAL_COMPONENTS[activeModel];

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={() => dispatch(closeModal())}>
            <div className="border p-3" onClick={(e) => e.stopPropagation()}>
                <SpecificModal />
            </div>
        </div>
    );
};