'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const { customerId, amount, status } = CreateInvoice.parse(rawFormData);
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Test it out:
  console.log(`${customerId}, ${amountInCents}, ${status}, ${date}`);
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  /*
revalidatePath允許您按需清除特定路徑的快取資料。
Next.js 有一個內建的資料緩存，
可以在傳入的伺服器請求和部署中保留資料獲取的結果。
當你調用 revalidatePath('/dashboard/invoices') 時，
Next.js 會在後台重新生成 /dashboard/invoices 這個路徑的頁面。
並清除資料快取
當生成完成後，新的訪問者將會看到更新後的頁面。
這對於需要定期更新的靜態內容非常有用。
 */
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
}
