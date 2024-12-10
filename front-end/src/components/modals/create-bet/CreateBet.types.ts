export type CreateBetModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export type CreateBetFormProps = {
  onSuccess: () => void;
  onError: (error: string) => void;
}