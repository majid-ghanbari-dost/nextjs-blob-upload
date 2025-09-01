import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log("دریافت درخواست...");
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.error("فایلی ارسال نشده");
      return NextResponse.json({ error: 'فایلی ارسال نشده است' }, { status: 400 });
    }

    console.log("آپلود فایل:", file.name);
    const blob = await put(file.name, file, {
      access: 'public',
    });

    console.log("آپلود موفق:", blob.url);
    return NextResponse.json({
      url: blob.url,
      name: blob.pathname,
      size: file.size,
      type: file.type,
      uploaded: true
    });
    
  } catch (error: any) {
    console.error('خطای کامل:', error);
    return NextResponse.json({ error: 'خطا در آپلود فایل: ' + error.message }, { status: 500 });
  }
}

export const runtime = 'edge';
