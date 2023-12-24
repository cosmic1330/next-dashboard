/*
用于告诉框架特定的文件应该在客户端运行而不是服务器端。
这主要用于在服务器端组件中使用一些仅在客户端环境下有效的特性或 API。
*/
'use client';
import {
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from './style.module.css';

const links = [
  { name: 'Home', href: '/profile', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/profile/projects',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/profile/skills', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] w-[48px] items-center justify-center rounded-[12px]',
              {
                'hover:bg-sky-100 hover:text-blue-600': pathname !== link.href,
              },
              {
                [`relative rounded-[12px] bg-[#3b82f6] text-white shadow-xl ${style.link}`]:
                  pathname === link.href,
              },
            )}
          >
            <LinkIcon
              className={clsx('w-7', {'w-9': pathname === link.href})}
            />
          </Link>
        );
      })}
    </>
  );
}
