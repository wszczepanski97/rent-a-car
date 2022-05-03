import { signIn, signOut, useSession } from "next-auth/react";

export default function SignOut() {
  const { data, status } = useSession();
  if (status === "authenticated") {
    return (
      <>
        Signed in as {data.user.id} {data.user.role} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
