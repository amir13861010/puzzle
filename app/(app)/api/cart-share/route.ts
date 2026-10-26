import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

type CartShareAction = "copy" | "telegram" | "whatsapp";

function text(value: unknown, maxLength: number): string | undefined {
  return typeof value === "string" && value.length <= maxLength
    ? value
    : undefined;
}

function getDeviceType(userAgent: string): string {
  if (/ipad|tablet|playbook|silk/i.test(userAgent)) return "تبلت";
  if (/mobile|iphone|ipod|android/i.test(userAgent)) return "موبایل";
  return "کامپیوتر";
}

function getBrowser(userAgent: string): string {
  if (/edg\//i.test(userAgent)) return "Edge";
  if (/opr\//i.test(userAgent)) return "Opera";
  if (/firefox\//i.test(userAgent)) return "Firefox";
  if (/chrome\//i.test(userAgent)) return "Chrome";
  if (/safari\//i.test(userAgent)) return "Safari";
  return "نامشخص";
}

function getOperatingSystem(userAgent: string): string {
  if (/android/i.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  if (/windows/i.test(userAgent)) return "Windows";
  if (/mac os/i.test(userAgent)) return "macOS";
  if (/linux/i.test(userAgent)) return "Linux";
  return "نامشخص";
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (!origin || origin !== new URL(request.url).origin) {
      return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 403 });
    }

    const rawBody = await request.text();
    if (rawBody.length > 20_000) {
      return NextResponse.json({ error: "درخواست بیش از حد بزرگ است" }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
    }

    const { action, items, device } = body as {
      action?: unknown;
      items?: unknown;
      device?: unknown;
    };
    if (
      action !== "copy" &&
      action !== "telegram" &&
      action !== "whatsapp"
    ) {
      return NextResponse.json({ error: "نوع اقدام نامعتبر است" }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return NextResponse.json({ error: "اقلام سبد نامعتبر است" }, { status: 400 });
    }

    const payload = await getPayloadClient();
    const savedItems = [];
    for (const rawItem of items) {
      if (!rawItem || typeof rawItem !== "object") {
        return NextResponse.json({ error: "قلم سبد نامعتبر است" }, { status: 400 });
      }
      const item = rawItem as { id?: unknown; quantity?: unknown };
      const id = text(item.id, 100);
      const quantity = item.quantity;
      if (
        !id ||
        typeof quantity !== "number" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 99
      ) {
        return NextResponse.json({ error: "قلم سبد نامعتبر است" }, { status: 400 });
      }

      let record:
        | { id: string; name: string; price: number; itemType: "product" | "course" }
        | undefined;
      try {
        const product = await payload.findByID({
          collection: "products",
          id,
          depth: 0,
        });
        record = {
          id: String(product.id),
          name: product.name,
          price: product.price,
          itemType: "product",
        };
      } catch {
        try {
          const course = await payload.findByID({
            collection: "courses",
            id,
            depth: 0,
          });
          record = {
            id: String(course.id),
            name: course.title_fa,
            price: course.price,
            itemType: "course",
          };
        } catch {
          return NextResponse.json({ error: "محصول یا دوره پیدا نشد" }, { status: 400 });
        }
      }

      if (!record || !Number.isFinite(record.price) || record.price < 0) {
        return NextResponse.json({ error: "قیمت قلم سبد نامعتبر است" }, { status: 400 });
      }
      savedItems.push({
        itemId: record.id,
        itemType: record.itemType,
        name: record.name,
        unitPrice: record.price,
        quantity,
        lineTotal: record.price * quantity,
      });
    }

    const userAgent = request.headers.get("user-agent") || "";
    const deviceInput =
      device && typeof device === "object"
        ? (device as { timezone?: unknown; screen?: unknown })
        : {};
    const total = savedItems.reduce((sum, item) => sum + item.lineTotal, 0);

    await payload.create({
      collection: "cart_shares",
      overrideAccess: true,
      data: {
        action: action as CartShareAction,
        items: savedItems,
        total,
        device: {
          deviceType: getDeviceType(userAgent),
          browser: getBrowser(userAgent),
          operatingSystem: getOperatingSystem(userAgent),
          platform: text(request.headers.get("sec-ch-ua-platform"), 50),
          language: text(request.headers.get("accept-language"), 100),
          timezone: text(deviceInput.timezone, 80),
          screen: text(deviceInput.screen, 30),
        },
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Cart share save error:", error);
    return NextResponse.json({ error: "ثبت گزارش انجام نشد" }, { status: 500 });
  }
}
