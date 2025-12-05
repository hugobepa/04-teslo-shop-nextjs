
// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import { getOrdersByUser, getPaginatedOrders, getPaginaterUsers } from '@/actions';
import { Title } from '@/components';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import { UsersTable } from './ui/UsersTable';

export default async function () {

 
  const {ok,users=[]} = await  getPaginaterUsers();

  if (!ok) {
    redirect('/auth/login')
  }


  return (
    <>
      <Title title="Mantenimiento usuarios" />

      <div className="mb-10">
       <UsersTable users={users}/>      
       </div>
    </>
  );
}