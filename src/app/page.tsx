import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton forceRedirectUrl={"/projects/new"} />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <main className="flex min-h-screen flex-col items-center p-24">
        hello world!
      </main>
    </div>
  );
}
