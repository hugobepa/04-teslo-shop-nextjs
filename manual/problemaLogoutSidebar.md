//https://nextjs.org/learn/dashboard-app/adding-authentication
//https://github.com/JuanKitu/teslo-shop/commit/a23f98eb429d444c97a42bb694b7272378345dff

o solucione con este ultimo commit no se si es la solucion mas optima. el server action del logout lo saque pero mantengo el spa y no tengo que romper la pagina con un refresh que es lo que mas me interesa.

#paginas
sidedar ( buscar logOut ,log ,logout)
logout
index (/src/actions)


````
    Uncaught (in promise) Error: NEXT_REDIRECT
     getRedirectError redirect.ts:21
     
     serverActionReducer server-action-reducer.ts:415
     
     promise callback*serverActionReducer server-action-reducer.ts:236
     
     clientReducer router-reducer.ts:50
     
     action app-router-instance.ts:221
     
     runAction app-router-instance.ts:108
     
     dispatchAction app-router-instance.ts:173
     
     dispatch app-router-instance.ts:219
     
     dispatch use-action-queue.ts:45
     
     startTransition react-dom-client.development.js:7967
     
     dispatch use-action-queue.ts:44
     
     dispatchAppRouterAction use-action-queue.ts:22
     
     callServer app-call-server.ts:8
     
     startTransition React
     
     callServer app-call-server.ts:7
     
     callServer app-call-server.ts:6
     
     action react-server-dom-turbopack-client.browser.development.js:3479
     
     logout logout.ts:5
     
     onClick Sidebar.tsx:95
     
     executeDispatch react-dom-client.development.js:16970
     
     runWithFiberInDEV react-dom-client.development.js:874
     
     processDispatchQueue react-dom-client.development.js:17020
     
     dispatchEventForPluginEventSystem react-dom-client.development.js:17621
     
     batchedUpdates$1 react-dom-client.development.js:3311
     
     dispatchEventForPluginEventSystem react-dom-client.development.js:17174
     
     dispatchEvent react-dom-client.development.js:21358
     
     dispatchDiscreteEvent react-dom-client.development.js:21325
     
     addTrappedEventListener react-dom-client.development.js:17121
     
     listenToNativeEvent react-dom-client.development.js:17057
     
     listenToAllSupportedEvents react-dom-client.development.js:17069
     
     listenToAllSupportedEvents react-dom-client.development.js:17066
     
     hydrateRoot react-dom-client.development.js:25738
     
     hydrate app-index.tsx:291
     
     startTransition React
     
     hydrate app-index.tsx:290
     
     <anonymous> app-next-turbopack.ts:13
     
     appBootstrap app-bootstrap.ts:76
     
     loadScriptsInSequence app-bootstrap.ts:22
     
     appBootstrap app-bootstrap.ts:58
     
     <anonymous> app-next-turbopack.ts:10
     
     instantiateModule dev-base.ts:241
     
     runModuleExecutionHooks dev-base.ts:275
     
     instantiateModule dev-base.ts:235
     
     getOrInstantiateRuntimeModule dev-base.ts:128
     
     registerChunk runtime-backend-dom.ts:57
     
     registerChunk dev-base.ts:1146
     
     NextJS 
````

#solucion


"/src/actions/auth/logout.ts":

````
    'use server'
     
    import { signOut } from "@/auth.config"
    import { redirect } from "next/navigation";
     
     
    export const logout = async () => {
        
        await signOut({ redirect: false });
        
        
    }
````

"sidebar.tsx":

````
    const logOutAndCloseMenu=()=>
    {
         closeMenu();
         logout()
    }
     
    return(
    ...
     
     
    <Link
              //onClick={() => logout()} 
              onClick ={()=>logOutAndCloseMenu()}
              className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all" 
              href={"/"} 
                   >
              <IoLogOutOutline size={30} /> 
              <span className="ml-3 text-xl">Salir</span> 
            </Link>

   ````         