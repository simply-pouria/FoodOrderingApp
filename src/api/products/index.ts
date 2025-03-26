import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";


export  const useProductList = () => {

    return  useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const {data, error} = await supabase.from('products').select('*');

            if (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
            return data;
        },
    })
};

export  const useProduct = (id: number) => {

    return  useQuery({
        queryKey: ['products', id],


        queryFn: async () => {
            const {data, error} = await supabase.from('products').select('*').eq('id', id).single();
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    })
};

export const useInsertProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: any) {
            const {error, data: newProduct} = await supabase.from('products').insert({
                name: data.name,
                image: data.image,
                price: data.price,
            })
                .single();

            if (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
            return newProduct;
        },
        async onSuccess() {
            // @ts-ignore
            await queryClient.invalidateQueries(['products']);

        },

    })

}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        async mutationFn(data: any) {
            const {error, data: updatedProduct} = await supabase.from('products').update({
                name: data.name,
                image: data.image,
                price: data.price,
            })
                .eq('id', data.id)
                .select()
                .single();

            if (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
            return updatedProduct;
        },
        async onSuccess(_, {id}) {
            // @ts-ignore
            await queryClient.invalidateQueries(['products']);
            // @ts-ignore
            await queryClient.invalidateQueries(['products', id]);

        },

    })

}