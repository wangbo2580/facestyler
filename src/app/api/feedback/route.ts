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

    // ==================== Slack 通知（已启用）====================

    // 发送到 Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        // 问题类型映射（中文）
        const issueLabels: Record<string, string> = {
          too_few_hairstyles: "发型数量太少",
          not_suitable: "推荐的发型不适合我",
          detection_inaccurate: "脸型检测不准确",
          images_poor_quality: "图片质量不好",
          slow_loading: "加载太慢",
          other: "其他问题",
        };

        // 格式化问题列表
        const issuesList = data.issues
          .map((id: string) => `• ${issueLabels[id] || id}`)
          .join("\n");

        // 评分表情
        const ratingEmoji = data.rating >= 4 ? "⭐" : data.rating >= 3 ? "😐" : "❌";

        // 格式化时间
        const time = new Date(data.timestamp).toLocaleString("zh-CN", {
          timeZone: "Asia/Shanghai",
        });

        // 构建 Slack 消息
        const slackMessage = {
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🆕 新用户反馈 - FaceStyler",
                emoji: true,
              },
            },
            {
              type: "section",
              fields: [
                {
                  type: "mrkdwn",
                  text: `*${ratingEmoji} 评分:*\n${data.rating}/5`,
                },
                {
                  type: "mrkdwn",
                  text: `*🕐 时间:*\n${time}`,
                },
              ],
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*❌ 反馈问题:*\n${issuesList}`,
              },
            },
          ],
        };

        // 添加用户评论（如果有）
        if (data.comment && data.comment.trim()) {
          slackMessage.blocks.push({
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*💬 详细评论:*\n>${data.comment}`,
            },
          });
        }

        // 添加用户代理信息（折叠）
        if (data.userAgent) {
          slackMessage.blocks.push({
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `🌐 ${data.userAgent.substring(0, 80)}...`,
              },
            ],
          });
        }

        // 发送到 Slack
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackMessage),
        });

        console.log("✅ Slack 通知已发送");
      } catch (slackError) {
        // Slack 通知失败不应影响主流程
        console.error("❌ Slack 通知发送失败:", slackError);
      }
    }

    // ==================== 其他选项（可选）====================

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

    // 选项2: 发送邮件通知
    // await sendEmail({
    //   to: "admin@facestyler.com",
    //   subject: "新用户反馈",
    //   body: JSON.stringify(data, null, 2),
    // });

    // 选项3: 保存到文件（简单但不推荐生产环境）
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
