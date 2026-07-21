import axios from "axios"

export const serviceCategories = async () => {
    const apiUrl = typeof window === 'undefined'
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/services`
        : '/api/services';

    const res = await axios.get(apiUrl);

    // console.log(res?.data)
    return res?.data;
}
