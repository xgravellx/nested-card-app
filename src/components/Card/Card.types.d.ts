import { Card } from "../../Types"

export type CardProps = {
    card: Card | undefined,
    handleReply: (parentId: number, numberInput: number, isEdit?: boolean) => void,
    handleDelete: (cardInput: number) => void,
}