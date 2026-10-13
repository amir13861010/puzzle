import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { error: "postId الزامی است" },
      { status: 400 }
    );
  }

  const payload = await getPayloadClient();

  const comments = await payload.find({
    collection: "comments",
    where: {
      post: { equals: postId },
      approved: { equals: true },
    },
    sort: "-createdAt",
    limit: 100,
  });

  return NextResponse.json({ comments: comments.docs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, comment, postId } = body;

    // اعتبارسنجی
    if (!fullName || !email || !comment || !postId) {
      return NextResponse.json(
        { error: "همه فیلدها الزامی هستن" },
        { status: 400 }
      );
    }

    if (fullName.length < 2) {
      return NextResponse.json(
        { error: "نام باید حداقل ۲ کاراکتر باشه" },
        { status: 400 }
      );
    }

    if (comment.length < 5) {
      return NextResponse.json(
        { error: "متن کامنت باید حداقل ۵ کاراکتر باشه" },
        { status: 400 }
      );
    }

    // اعتبارسنجی ایمیل ساده
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "ایمیل نامعتبر است" },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    // ساخت کامنت (approved: false → نیاز به تایید ادمین)
    const newComment = await payload.create({
      collection: "comments",
      data: {
        fullName,
        email,
        comment,
        post: postId,
        approved: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "کامنت شما ثبت شد و پس از تایید نمایش داده می‌شه",
      comment: newComment,
    });
  } catch (err) {
    console.error("Comment error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "خطا در ثبت کامنت",
      },
      { status: 500 }
    );
  }
}