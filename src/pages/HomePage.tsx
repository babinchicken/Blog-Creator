import Button from '../components/atoms/Button'

interface HomePageProps {
  onGetStarted: () => void
}

const features = [
  {
    icon: '✍️',
    title: 'Write with Ease',
    description: 'A clean, distraction-free editor to bring your ideas to life.',
  },
  {
    icon: '🎨',
    title: 'Choose a Template',
    description: 'Pick from Modern or Academic layouts that suit your style.',
  },
  {
    icon: '🚀',
    title: 'Publish Instantly',
    description: 'Submit your post for review and go live in minutes.',
  },
]

export default function HomePage({ onGetStarted }: HomePageProps) {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-8 py-20 text-center bg-gradient-to-b from-purple-50 to-white">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-6">
          <span>✨</span> Now in beta
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4 max-w-2xl mx-auto">
          Turn your ideas into beautiful blog posts
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          Write, preview with a professional template, and publish — all in one simple place.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button label="Start Writing →" onClick={onGetStarted} size="lg" />
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-3 p-6 rounded-xl border border-gray-100 hover:border-purple-100 hover:bg-purple-50/30 transition-colors"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Template showcase */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Two beautiful templates</h2>
          <p className="text-sm text-gray-500">Choose the style that fits your content best.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Modern preview */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-5">
              <div className="flex gap-1.5 mb-3">
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">react</span>
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">design</span>
              </div>
              <div className="h-2.5 bg-white/50 rounded w-3/4 mb-2" />
              <div className="h-2 bg-white/30 rounded w-1/2" />
            </div>
            <div className="p-4 space-y-2">
              <div className="h-2 bg-gray-100 rounded w-full" />
              <div className="h-2 bg-gray-100 rounded w-5/6" />
              <div className="h-2 bg-gray-100 rounded w-4/6" />
            </div>
            <div className="px-4 pb-4">
              <span className="text-xs font-medium text-purple-600">✨ Modern Template</span>
            </div>
          </div>

          {/* Academic preview */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="p-5 border-b-2 border-gray-800">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                research · education
              </div>
              <div className="h-2.5 bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-2 bg-gray-300 rounded w-1/2" />
            </div>
            <div className="p-4 space-y-2">
              <div className="h-2 bg-gray-100 rounded w-full" />
              <div className="h-2 bg-gray-100 rounded w-5/6" />
              <div className="h-2 bg-gray-100 rounded w-full" />
              <div className="h-2 bg-gray-100 rounded w-4/6" />
            </div>
            <div className="px-4 pb-4">
              <span className="text-xs font-medium text-gray-600">📚 Academic Template</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Ready to start writing?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Join writers who use Blog Creator to share their ideas with the world.
        </p>
        <Button label="Create Your First Post →" onClick={onGetStarted} size="lg" />
      </section>
    </div>
  )
}
