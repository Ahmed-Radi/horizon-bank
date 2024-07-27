import AuthForm from '@/components/AuthForm'

type Props = {}

async function SignIn({}: Props) {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type={"sign-in"} />
    </section>
  )
}

export default SignIn