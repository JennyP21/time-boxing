import { Button, Center } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Center className='h-screen bg-black' backgroundImage="/images/notfound.svg" bgRepeat="no-repeat">
      <div className='text-center text-stone-300'>
        <h2 className='text-6xl'>Page Not Found</h2>
        <p className='my-3 text-lg'>Looks like you've stumbled into a glitch in the Matrix. Try searching for a different page.</p>
        <Button colorScheme='green'>
          <Link href="/">Go back to Home</Link>
        </Button>
      </div>
    </Center>
  )
}