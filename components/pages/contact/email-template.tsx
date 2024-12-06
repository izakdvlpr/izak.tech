interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export function EmailTemplate({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps) {
  return (
    <div>
      <ul>
        <li>Name: {name}</li>
        <li>Email: {email}</li>
        <li>Subject: {subject}</li>
        <li>Message: {message}</li>
      </ul>
    </div>
  )
}
