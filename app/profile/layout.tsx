import SideNav from '@/app/ui/profile/nav';
// on navigation, only the page components update, the layout won't re-render.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen m-auto font-mono lg:flex">
      <SideNav />
      <main className="w-full">{children}</main>
    </div>
  );
}
