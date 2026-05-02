export default function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-red-500">TAILWIND TEST</h1>
        <h1 className="text-3xl font-bold">My Company</h1>
        <p className="text-gray-600 mt-2">
          We are a modern company focused on delivering high quality web
          applications.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">About Us</h2>
        <p className="text-gray-600 mt-2">
          Our company specializes in building scalable and maintainable web
          solutions using modern technologies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Vision & Mission</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
          <li>Deliver high quality products</li>
          <li>Focus on user experience</li>
          <li>Continuously improve and innovate</li>
        </ul>
      </section>
    </div>
  );
}