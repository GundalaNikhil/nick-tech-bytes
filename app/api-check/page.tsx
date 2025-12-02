"use client";

export default function ApiCheckPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          API Configuration Check
        </h1>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
            <h2 className="font-semibold text-blue-900 mb-2">
              Current API Base URL:
            </h2>
            <code className="text-sm bg-blue-100 px-2 py-1 rounded">
              {apiUrl}
            </code>
          </div>
          
          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h2 className="font-semibold text-green-900 mb-2">
              Expected (Development):
            </h2>
            <code className="text-sm bg-green-100 px-2 py-1 rounded">
              https://nicktechbytes-be-dev-development.up.railway.app/api/v1
            </code>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="font-semibold text-yellow-900 mb-2">
              ⚠️ If URLs don&apos;t match:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
              <li>Go to Netlify dashboard</li>
              <li>Clear build cache</li>
              <li>Trigger deploy with &quot;Clear cache and deploy site&quot;</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
