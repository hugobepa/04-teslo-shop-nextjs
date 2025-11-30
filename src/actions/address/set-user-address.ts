'use server'

import { Address } from "@/interfaces"
import prisma from "@/lib/prisma"

export const setUserAddress = async (address: Address, userId: string) => {

    try {

        const newAddress = await createOrReplaceAddress(address, userId);

        return {
            ok: true,
            address: newAddress,
            message: 'insercion de dirrecion correcta'
        }

    } catch (error) {
        console.log({ error })
        return {
            ok: false,
            message: 'no se pudo grabar la dirrecion',
        }

    }

}


const createOrReplaceAddress = async (address: Address, userId: string) => {

    try {
        console.log({userId})
        // Buscar dirección existente
        const storedAddress = await prisma.userAddress.findUnique({
            where: { userId }
        })

         // Preparar datos para guardar
        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            city: address.city,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
        };



        // Si no existe una dirección, la creamos
        if (!storedAddress) {
            console.log('no existe una dirección almacenada')
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })

            return newAddress
        }

        // Si existe, la actualizamos        
          const updateAddress = await prisma.userAddress.update({
                where:{userId},
                data: addressToSave
            })

            return updateAddress;

    } catch (error) {
        console.log({ error })
        throw new Error('no se pudo grabar la dirrecion')
    }

}
