// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import jwt from "jsonwebtoken";

// async function validateToken(token: string) {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//       role: string;
//       email: string;
//     };
//   } catch {
//     console.log("Token is invalid or expired");
//     return null; // expired or tampered
//   }
// }

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;

//   //console.log("THIS IS FROM DASHBOARD, accessToken", accessToken);

//   if (!accessToken) {
//     redirect("/login");
//   }

//   console.log("I PASSED THIS POINT in the dashboard layout");

//   // CRITICAL: Validate the token with your backend
//   const user = await validateToken(accessToken);

//   if (!user) {
//     // Token is invalid or expired
//     redirect("/login");
//   }

//   return (
//     <div>
//       {/* Your dashboard layout */}
//       {children}
//     </div>
//   );
// }


import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  return <div>{children}</div>;
}