import "./Auth.css"
import { Input , Stack } from '@chakra-ui/react'

export default function Login() {

  return (
    <>
      <div className="login">
        <Stack spacing={3}>
          <Input variant='outline' placeholder='Outline' />
          <Input variant='filled' placeholder='Filled' />
          <Input variant='flushed' placeholder='Flushed' />
          <Input variant='unstyled' placeholder='Unstyled' />
        </Stack>
      </div>
    </>
  )
}