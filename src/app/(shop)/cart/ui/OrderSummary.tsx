//https://github.com/pmndrs/zustand/discussions/2855
//https://zustand.docs.pmnd.rs/migrations/migrating-to-v5#requiring-stable-selector-outputs
'use client'

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useShallow } from "zustand/shallow";

export const OrderSummary = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const { subTotal, tax, total, itemsInCart } = useCartStore(useShallow((state) => state.getSummaryInformation()));
    // const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    //     state.getSummaryInformation()
    // );

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return <p>Loading...</p>

    return (
        <div className="grid grid-cols-2">

            <span >No. Productos</span>
            <span className="text-right">{itemsInCart === 1 ? '1 articulo' : `${itemsInCart}  articulos`}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat( subTotal)}</span>

            <span>Impuestos(15%)</span>
            <span className="text-right">{currencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>

        </div>
    )
}
