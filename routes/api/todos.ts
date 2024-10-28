import type { Handlers } from "$fresh/server.ts";

const TODO_KEY = ["todos"];

export const handler: Handlers = {
    async GET(req) {
        const kv = await Deno.openKv();
        const todos = await kv.get<string[]>(TODO_KEY);
        return new Response(JSON.stringify(todos?.value || []), {
            headers: { "Content-Type": "application/json" },
        });
    },
    async POST(req) {
        const kv = await Deno.openKv();
        const newTodo = await req.json();

        // Retrieve existing todos or initialize an empty array if none exist
        const todos = (await kv.get<string[]>(TODO_KEY))?.value || [];
        
        // Add the new todo item to the existing list
        todos.push(newTodo);
 
        // Save the updated list back to the KV store
        await kv.atomic().set(TODO_KEY, todos).commit();

        return new Response(JSON.stringify(todos?.value || []), {
            headers: { "Content-Type": "application/json" },
        });
    },
    async DELETE(req) {
        const kv = await Deno.openKv();
        let todos = await kv.get<string[]>(TODO_KEY);
        const index = (await req.json()).index;
        const newTodos = todos?.value.filter((_, i) => i !== index);
        await kv.atomic().set(TODO_KEY, newTodos).commit();

        return new Response(JSON.stringify(newTodos?.value || []), {
            headers: { "Content-Type": "application/json" },
        });
    },
}