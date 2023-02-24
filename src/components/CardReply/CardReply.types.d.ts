export type CardReplyProps = {
    parentId: number;
    onSubmit: (parentId: number, reply: number, isEdit?: boolean) => void;
    onFinish: () => void;
    numberInput?: number;
}