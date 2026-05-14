'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { RegistrationData } from '@/lib/types'

export async function updateGlobalSetting(key: string, value: string) {
  const supabase = createAdminClient()
  
  const { error } = await supabase
    .from('global_settings')
    .upsert({ key, value }, { onConflict: 'key' })

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/config')
  revalidatePath('/')
}

export async function updatePlayer(id: string, formData: RegistrationData) {
  const supabase = createAdminClient()

  
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
  const supabase = createAdminClient()

  
  const { error } = await supabase
    .from('players')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/players')
  revalidatePath('/admin')
}
