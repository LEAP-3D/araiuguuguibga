import Link from 'next/link';

export const metadata = {
  title: 'Offline | My App',
  description: 'You are offline. Please check your connection and try again.',
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">You are offline</h1>
        <p className="text-gray-600 mb-6">
          This page is not available without an internet connection. Please check your network and try again.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Retry
        </Link>
      </div>
    </div>
  );
}
