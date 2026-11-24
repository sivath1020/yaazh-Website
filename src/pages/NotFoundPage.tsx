export function NotFoundPage() {
  return <section className="pt-40 pb-24 px-6 text-center min-h-[70vh]">
    <p className="text-blue-700 font-semibold">404</p>
    <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
    <p className="mt-4 text-neutral-600">The page you’re looking for may have moved. Let’s get you back to Yaazh 360 Digitech.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-6"><a className="text-blue-700 underline" href="/">Home</a><a className="text-blue-700 underline" href="/services">Our services</a><a className="text-blue-700 underline" href="/contact">Contact us</a></div>
  </section>;
}
