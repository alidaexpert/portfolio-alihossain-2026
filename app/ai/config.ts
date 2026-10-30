/** Public message shape shared by the chat UI and local worker. */
export type ChatMessage = {role: 'user' | 'assistant'; content: string; notice?: string; createdAt?: string};
