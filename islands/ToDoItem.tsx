import { useState } from "preact/hooks";

export default function ToDoItem(
    { text, onDelete }: { text: string; onDelete: () => void },
) {
    const [completed, setCompleted] = useState(false);

    return (
        <div class="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => setCompleted(!completed)}
            />
            <span class={completed ? "line-through" : ""}>{text.text}</span>
            <button onClick={onDelete} class="text-red-500">Delete</button>
        </div>
    );
}
