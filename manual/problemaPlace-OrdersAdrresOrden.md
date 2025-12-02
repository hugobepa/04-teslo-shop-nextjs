cap 348-transacion-actualizar inventario

No sé si a alguien más le pase lo mismo, pero en mi caso ejecute en la consola nuevamente el  npm run seed luego npm run dev elimine todos los productos del carrito, cerré sesión e inicie sesión de nuevo con el usuario de rol user y agregue nuevamente los productos al carrito y se me quito el error del prisma.orderAddres.create()

la forma en que yo arregle el problema era simplemente en ves de usar el spread del rest metí todos valores de 1 en 1 es decir si la data me pide el postalCode pues escribo dentro de la data postalCode: address.postalCode esto por que haveces el spread incluye valores que uno no espera si bien no es la solucion mas eficiente arregla el problema