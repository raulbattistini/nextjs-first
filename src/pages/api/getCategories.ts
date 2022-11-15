import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../config/sanity";

const query = groq`*[_type == "category"] {
    _id,
    ...
}`;

interface IData {
    categories: Category[]
}

export const handler = async (req: NextApiRequest, res: NextApiResponse<IData>) =>{
    const categories = await sanityClient.fetch(query);
    console.log(categories);
    res.status(200).json({categories});
}