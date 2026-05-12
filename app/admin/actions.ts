'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updatePlayer(id: string, formData: any) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('players')
    .update({
      full_name: formData.fullName,
      age: parseInt(formData.age),
      mobile: formData.mobile,
      email: formData.email,
      primary_role: formData.role,
      batting_style: formData.battingStyle,
      bowling_style: formData.bowlingStyle,
      jersey_number: parseInt(formData.jerseyNumber),
      jersey_size: formData.jerseySize,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/players')
  revalidatePath('/admin')
}

export async function deletePlayer(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('players')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/players')
  revalidatePath('/admin')
}
