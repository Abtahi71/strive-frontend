let refreshPromise:Promise<boolean> | null = null

async function doRefresh():Promise<boolean>{
    const res = await fetch(`/api/refresh`,{method:"POST",credentials:"include"});
    return res.ok
}


export async function apiFetch(input:RequestInfo,init:RequestInit={}){
   const res = await fetch(input,{...init,credentials:"include"});


console.log("apiFetch FIRST RESPONSE:", res);

   if(res.status !== 401){
    return res
   }

   console.log("apiFetch: GOT 401 → REFRESHING");

   refreshPromise ??= doRefresh().finally(() => {
     refreshPromise = null;
   });

   const refreshed = await refreshPromise;

   console.log("apiFetch REFRESH RESULT:", refreshed);

   const pathname = window.location.pathname

   const isPublicPath = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password" || pathname === "/" || pathname.startsWith("/activities/")
   
   if (!refreshed && !isPublicPath) {
     
       window.location.replace("/login");
     

     return res;
   }

   

   const retry = await fetch(input, { ...init, credentials: "include" });

   console.log("apiFetch RETRY RESPONSE:", retry.status);

   return retry
}