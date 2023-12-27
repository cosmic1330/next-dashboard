import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import SessionData from './session-data';

export default async function SessionDataProvider() {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <SessionData />
    </SessionProvider>
  );
}
