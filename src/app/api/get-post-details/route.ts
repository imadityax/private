import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
    const accessToken = process.env.INSTA_ACCESS_TOKEN;
    if (!accessToken) {
        return NextResponse.json({ error: "Access token not found" }, { status: 500 });
    }
    try {
        const response = await axios.get(`https://graph.facebook.com/v23.0/17958470069978271?fields=id,media_type,media_url,like_count,comments_count,caption,timestamp&access_token={access_token}`);
        const data = await response.data;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching data, error: " + error }, { status: 500 });
    }
}
