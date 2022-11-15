import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../config/sanity";

const query = groq`*[_type == "product"] {
    _id,
    ...
} | order{_createdAt asc}`;

interface IData {
    products: Product[]
}

export const handler = async (req: NextApiRequest, res: NextApiResponse<IData>) =>{
    const products: Product[] = await sanityClient.fetch(query);
    console.log(products);
    res.status(200).json({products});
}