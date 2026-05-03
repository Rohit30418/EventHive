
const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        
        {/* Icon/Visual */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-amber-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Access Denied
        </h1>
        
        <p className="mt-4 text-slate-600 leading-relaxed">
          It looks like you don't have permission to view this page. Please make sure you are logged in with the correct account.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="/login"
            className="w-full inline-flex justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-md"
          >
            Sign in to your account
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex justify-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Go back
          </button>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Error Code: 403 Forbidden
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;