import { signInOther, signOutOther } from "@/auth"

export function SignIn({ provider, ...props }: { provider?: string }) {
  return (
    <form
      action={async () => {
        'use server';
        await signInOther(provider);
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOutOther();
      }}
      className="w-full"
    >
      <button className="w-full p-0">
        Sign Out
      </button>
    </form>
  );
}
