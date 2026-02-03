
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Simple hardcoded check for demo purposes
                // In production, fetch user from DB and hash passwords
                if (credentials?.username === "admin" && credentials?.password === "password") {
                    return { id: "1", name: "Admin", email: "admin@example.com" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/signin", // We'll need to create this or use default
    },
});

export { handler as GET, handler as POST };
