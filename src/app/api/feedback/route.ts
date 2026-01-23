import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 验证数据
    if (!data.rating || !data.issues) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 打印到服务器日志（开发环境）
    console.log("📊 User Feedback Received:", {
      rating: data.rating,
      issues: data.issues,
      comment: data.comment,
      timestamp: data.timestamp,
    });

    // ==================== 生产环境选项 ====================

    // 选项1: 保存到数据库
    // await db.feedback.create({
    //   data: {
    //     rating: data.rating,
    //     issues: data.issues,
    //     comment: data.comment,
    //     userAgent: data.userAgent,
    //     timestamp: new Date(data.timestamp),
    //   },
    // });

    // 选项2: 发送到第三方服务（如Slack、Discord、Webhook）
    // await fetch(process.env.SLACK_WEBHOOK_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     text: `新反馈 - 评分: ${data.rating}/5\n问题: ${data.issues.join(", ")}\n评论: ${data.comment || "无"}`,
    //   }),
    // });

    // 选项3: 发送邮件通知
    // await sendEmail({
    //   to: "admin@facestyler.com",
    //   subject: "新用户反馈",
    //   body: JSON.stringify(data, null, 2),
    // });

    // 选项4: 保存到文件（简单但不推荐生产环境）
    // const fs = require("fs");
    // const feedbackFile = "./feedback.jsonl";
    // fs.appendFileSync(feedbackFile, JSON.stringify(data) + "\n");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
