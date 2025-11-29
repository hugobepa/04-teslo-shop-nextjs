#Status useSession() is Unauthenticated but has next-auth.session-token

https://github.com/nextauthjs/next-auth/discussions/5719

Nextauth funciona, lo que genera el token y me redirige hasta ("/"), pero el useSession me retorna  {session: null, status: 'unauthenticated'}. Encontré que después de refrescar la pagina, si lee correctamente el token y cambia el estatus. Pero no he encontrado como solucionar este error para que lea bien el token directamente.

Para resolver este problema tienes que colocar el redirect en false en tu login.ts:

    await signIn("credentials", {
          redirect: false,
          ...Object.fromEntries(formData),
        });

Y por último, en tu LoginForm el useEffect lo colocarás de esta manera:

    useEffect(() => {
        if (errorMessage === "Success") {
          window.location.replace('/');
        }
      }, [errorMessage]);