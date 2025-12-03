"use client";

import { API_ENDPOINTS } from "@/lib/api-client";

export default function ApiCheckPage() {
  // Get the actual base URL being used
  const actualApiUrl = API_ENDPOINTS.AUTH.HEALTH.replace("/auth/health", "");
  
  // These are what the env vars SHOULD be
  const expectedDevUrl = "https://nicktechbytes-be-dev-development.up.railway.app/api/v1";
  const wrongProdUrl = "https://nicktechbytes-be-dev-production.up.railway.app/api/v1";
  
  const isCorrect = actualApiUrl === expectedDevUrl;
  const isWrongProd = actualApiUrl === wrongProdUrl;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          API Configuration Check
        </h1>
        
        <div className="space-y-4">
          <div className={`border-l-4 p-4 ${
            isCorrect ? 'border-green-500 bg-green-50' : 
            isWrongProd ? 'border-red-500 bg-red-50' : 
            'border-blue-500 bg-blue-50'
          }`}>
            <h2 className={`font-semibold mb-2 ${
              isCorrect ? 'text-green-900' : 
              isWrongProd ? 'text-red-900' : 
              'text-blue-900'
            }`}>
              {isCorrect ? '✅ Current API Base URL (CORRECT):' : 
               isWrongProd ? '❌ Current API Base URL (WRONG - Using PROD):' : 
               'Current API Base URL:'}
            </h2>
            <code className={`text-sm px-2 py-1 rounded break-all ${
              isCorrect ? 'bg-green-100' : 
              isWrongProd ? 'bg-red-100' : 
              'bg-blue-100'
            }`}>
              {actualApiUrl}
            </code>
          </div>
          
          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h2 className="font-semibold text-green-900 mb-2">
              Expected (Development):
            </h2>
            <code className="text-sm bg-green-100 px-2 py-1 rounded break-all">
              {expectedDevUrl}
            </code>
          </div>
          
          {isWrongProd && (
            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <h2 className="font-semibold text-red-900 mb-2">
                ⛔ Issue Detected:
              </h2>
              <p className="text-sm text-red-800">
                You are using the PRODUCTION Railway service instead of DEVELOPMENT.
                This means the environment variable is not being applied correctly.
              </p>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="font-semibold text-yellow-900 mb-2">
              ⚠️ To Fix This Issue:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
              <li>Verify Netlify env var: <code className="bg-yellow-100 px-1">NEXT_PUBLIC_API_URL={expectedDevUrl}</code></li>
              <li>Go to: <a href="https://app.netlify.com/sites/nicktechbytes/configuration/deploys" className="text-blue-600 underline" target="_blank" rel="noopener">Netlify Deploy Settings</a></li>
              <li>Click &quot;Clear build cache&quot;</li>
              <li>Go to: <a href="https://app.netlify.com/sites/nicktechbytes/deploys" className="text-blue-600 underline" target="_blank" rel="noopener">Netlify Deploys</a></li>
              <li>Click &quot;Trigger deploy&quot; → &quot;Clear cache and deploy site&quot;</li>
            </ol>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
            <h3 className="font-semibold text-gray-900 mb-2">
              Debug Info:
            </h3>
            <div className="text-xs font-mono space-y-1 text-gray-700">
              <div>Build Time: {new Date().toISOString()}</div>
              <div>Environment: {process.env.NEXT_PUBLIC_ENVIRONMENT || 'not set'}</div>
              <div>All API Endpoints:</div>
              <pre className="mt-2 p-2 bg-white rounded overflow-x-auto">
                {JSON.stringify(API_ENDPOINTS, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
