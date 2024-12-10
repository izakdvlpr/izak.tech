import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Isaque Lima | About',
}

export default function AboutPage() {
  return (
    <main className="mt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">About</h1>

      <p className="text-lg text-gray-200">
        My name is Isaque Lima,{' '}
        {new Date().getFullYear() - new Date('2003-04-01').getFullYear()} years
        old. I am a System Analyst and a student. I am passionate about
        technology and programming. I am currently studying Systems Analysis and
        Development at the University of Vila Velha.
      </p>

      <p className="text-lg text-gray-200">
        I've started my career as a developer in 2018, and since then I've been
        working with creating bots for discord. I have experience with
        technologies like JavaScript, TypeScript, React, Next, Node.js, and
        others. I am also a self-taught developer and I have been programming
        since I was 15 years old. I am always looking for new opportunities to
        learn and grow as a developer.
      </p>

      <p className="text-lg text-gray-200">
        I am currently working in Akler as a Fullstack Developer, where I work
        with technologies like React, Next, Node.js, and others.
      </p>
    </main>
  )
}
