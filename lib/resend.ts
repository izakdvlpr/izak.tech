import { Resend } from 'resend'

import { environment } from './environment'

export const resend = new Resend(environment.RESEND_TOKEN)
