import Modal from "../../common/modal/Modal";
import CreateBetModalProps from "./CreateBet.types";

/**
 * @function CreateBetModal
 * @description The create bet modal form
 * @author J. Trpka
 * @param {CreateBetModalProps} props
 * @returns {JSX.Element}
 */
const CreateBetModal = ({isOpen, onClose}: CreateBetModalProps) => {
  return (
    <Modal 
      title={"Create New Bet"} 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <p>Hello World</p>
    </Modal>
  );
};

export default CreateBetModal;