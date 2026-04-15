import { TodoSection } from '@/components/organisms'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">NestList</h1>
          <p className="mt-1 text-sm text-slate-400">Keep your day on track</p>
        </div>
        <TodoSection />
      </div>
    </main>
  )
}
