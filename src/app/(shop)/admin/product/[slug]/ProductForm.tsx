"use client";

import { createUpdateProduct, getCategories } from "@/actions";
import { Category, Product, ProductImage } from "@/interfaces"; //as ProductWithImage
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
    //product: Product & {ProductImage?: ProductImage[]};
    product: Partial<Product> & { ProductImage?: ProductImage[] };
    categories: Category[];

}

interface FormInputs {
    description: string;
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string;
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex';
    categoryId: string;

    //todo: Imagenes
    images?:FileList
}



const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { isValid },
        getValues,
        setValue,
        watch
    } = useForm<FormInputs>({
        defaultValues: {
            //title: 'este es mi titulo'
            ...product,
            tags: product.tags?.join(','),
            sizes: product.sizes ?? [],

            images: undefined,
        }
    });

    watch('sizes');

    const onSizeChanged = (size: string) => {

        const sizes = new Set(getValues('sizes'));

        sizes.has(size) ? sizes.delete(size) : sizes.add(size)

        setValue("sizes", Array.from(sizes));
    }

    const onSubmit = async (data: FormInputs) => {

        const formData = new FormData();

        const {images, ...productToSave } = data;
        const imagenVacia = '/imgs/placeholder.jpg'

        if(product.id){
            formData.append('id', product.id ?? '')
        }
  
        formData.append('title', productToSave.title)
        formData.append('slug', productToSave.slug)
        formData.append('description', productToSave.description)
        formData.append('price', productToSave.price.toString())
        formData.append('inStock', productToSave.inStock.toString())
        formData.append('sizes', productToSave.sizes.toString())
        formData.append('tags', productToSave.tags)
        formData.append('categoryId', productToSave.categoryId)
        formData.append('gender', productToSave.gender)

        console.log(images);
        if(images){
            for(let i=0;i< images.length;i++){
                formData.append('images',images[i]);
            }
        }

        const { ok,product: updatedProduct } = await createUpdateProduct(formData);
        if(!ok){
            alert('Producto no se pudo actualizar');
            return;
        }

        router.replace(`/admin/product/${updatedProduct?.slug}`)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200" {...register('gender', { required: true })}>
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select className="p-2 border rounded-md bg-gray-200" {...register('categoryId', { required: true })}>
                        <option value="">[seleccione]</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }

                    </select>
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">

                <div className="flex flex-col mb-2">
                    <span>Inventario</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200"
                     {...register('inStock', { required: true, min: 0 })} />
                </div>


                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div key={size}
                                    onClick={() => onSizeChanged(size)}
                                    className={
                                        clsx(
                                            "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                                            {
                                                "bg-blue-500 text-white": getValues('sizes').includes(size)
                                            }
                                        )
                                    }
                                >
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            type="file"
                            {...register('images')}
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {
                            product.ProductImage?.map((image) => (
                                <div key={image.id}>
                                    <Image
                                        src={`/products/${image.url}`}
                                        alt={product.title ?? ''}
                                        height={300}
                                        width={300}
                                        className="rounded-t shadow-md"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => console.log(image.id, image.url)}
                                        className="btn-danger w-[300px]  rounded-b-xl">
                                        Eliminar
                                    </button>
                                </div>

                            ))
                        }
                    </div>

                </div>
            </div>
        </form>
    );
};
