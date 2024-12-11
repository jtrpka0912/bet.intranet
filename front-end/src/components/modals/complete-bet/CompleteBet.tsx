import Modal from "../../common/modal/Modal";
import CompleteBetModalProps from "./CompleteBet.types";

/**
 * @function CompleteBetModal
 * @description The complete bet modal form
 * @author J. Trpka
 * @param props
 * @returns {JSX.Element}
 */
const CompleteBetModal = ({isOpen, onClose}: CompleteBetModalProps) => {
  return (
    <Modal
      title="Complete Bet"
      isOpen={isOpen}
      onClose={onClose}
    >
      <p>Hello World</p>
    </Modal>
  );
};

export default CompleteBetModal;