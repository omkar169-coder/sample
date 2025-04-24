// 'use client';

// import { SessionProvider } from "next-auth/react";

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return <SessionProvider>{children}</SessionProvider>;
// }


// src/app/Providers.tsx
// src/app/Providers.tsx

'use client';

// Defining the Providers component which will wrap the children
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Add any global providers or context providers here */}
      {children}
    </div>
  );
};

export default Providers;
