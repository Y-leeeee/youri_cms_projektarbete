export default function NotFoundPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg mt-4">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <a href="/" className="text-blue-500 hover:underline mt-6 inline-block">
        Go Back to Homepage
      </a>
    </div>
  );
}
