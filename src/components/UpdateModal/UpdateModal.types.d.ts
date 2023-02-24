export type UpdateModalProps = {
    initialValue: number;
    onClose: () => void;
    onUpdate: (value: number) => void;
}