import { fetchCustomers } from '@/app/dashboard/(api)/data';
import Breadcrumbs from '@/app/dashboard/(components)/invoices/breadcrumbs';
import Form from '@/app/dashboard/(components)/invoices/create-form';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
