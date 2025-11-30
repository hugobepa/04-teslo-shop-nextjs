
#Error de Type en set-user-address.ts cap 326:

"set-user-address.ts":

 const country = await prisma.country.findFirst({
            where: { name: address.country }
        })


const addressToSave ={
.....
countryId: country!.id
userId: userId

}
...
 const updateAddress = await prisma.userAddress.update({
                where:{userId: userId},
                ...

#TypeError: The "payload" argument must be of type object. Received null

// Preparar datos para guardar
    const addressToSave = {
      userId: userId || '',
      address: address.address ?? '',
      address2: address.address2 ?? '',
      countryId: address.country ?? '',
      city: address.city ?? '',
      firstName: address.firstName ?? '',
      lastName: address.lastName ?? '',
      phone: address.phone ?? '',
      postalCode: address.postalCode ?? ''
    }