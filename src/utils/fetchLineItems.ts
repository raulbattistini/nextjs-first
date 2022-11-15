export const fetchLineItems = async (sessionId: string) => {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSession?sesison_id=${sessionId}`
    );

    if(!res.ok) return;

    const data = await res.json();

    const lineItems = data.session.data;

    return lineItems;
};
