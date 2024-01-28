import SideNav from '@/app/profile/(ui)/profile/nav';
// on navigation, only the page components update, the layout won't re-render.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto h-screen font-mono lg:flex">
      <SideNav />
      <main className="w-full">{children}</main>
    </div>
  );
}
