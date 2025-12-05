interface Props {
   
 params: Promise<{ id: string }>
 //searchParams: Promise<{ [key: string]: string | string[] | undefined }>
 searchParams: Promise<{ [key: string]: string | undefined }>
}

{ params, searchParams }: Props



const {page} = await searchParams;
  
  const pageParams = page ?  parseInt(page)  : 1;
   
  const {products,currentPage,totalPages} = await getPaginatedProductsWithImages({pageParams}); 

   <Pagination totalPage={totalPages}/>