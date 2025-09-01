import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'فایلی ارسال نشده است' }, { status: 400 });
    }

    // آپلود فایل به Vercel Blob Storage
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // برگرداندن اطلاعات فایل آپلود شده
    return NextResponse.json({
      url: blob.url,
      name: blob.pathname,
      size: file.size,
      type: file.type,
      uploaded: true
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'خطا در آپلود فایل' }, { status: 500 });
  }
}

export const runtime = 'edge';