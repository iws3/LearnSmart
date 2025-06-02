import Vapi from "@vapi-ai/web";

console.log("VAPI SDK Token:", process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN); // For debugging
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
console.log("VAPI SDK Initialized:", vapi ? "Success" : "Failed"); // For debugging