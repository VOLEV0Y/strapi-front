"use client";

import { createClient } from '@/lib/supabase/browserClient';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function Lesson29() {
  const supabase = createClient();

  const { data: client = [] } = useQuery({
    queryKey: ["client"],
    queryFn: async () => {
      const res = await supabase.from("client").select("*");

      return res.data;
    }
  })

  const { data: drivers = [] } = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const res = await supabase.from("drivers").select("*");

      return res.data;
    }
  })

  console.log(client, drivers);

  const deleteVacation = async (vacationId: string) => {
    await supabase.from("drivers").delete().eq("id", vacationId);
  }

  const createUser = async () => {
    await supabase.from("drivers").insert({
      // id: Math.round(Math.random() * 2000000),
      fullname: "Pavel52",
      phone: "798749834",
      order_id: 1,
    });
  }

  return (
    <div>
      <div>
        Клиенты:
        {client.map((client) => (<div>{client.fullname}</div>))}
      </div>
      <div>
        Водители:
        {drivers.map((drivers) => (<div><div>{drivers.phone}</div><button className='bg-red-500 cursor-pointer' onClick={() => deleteVacation(drivers.id)}>Удалить</button></div>))}
      </div>
      <div>
        <input type='text' className='border border-black' />
        <button className='bg-green-500 cursor-pointer' onClick={() => createUser()}>Добавить пользователя</button>
      </div>
    </div>
  )
}


