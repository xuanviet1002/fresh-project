import ToDoList from "../islands/ToDoList.tsx";

export default function Todo() {
  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="p-4 max-w-md w-full">
        <h1 class="text-2xl font-bold mb-4">My To-Do List</h1>
        <ToDoList />
      </div>
    </div>
  );
}
