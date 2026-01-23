"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { trackFeedbackSubmit, trackComplaint } from "@/lib/analytics";

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"rating" | "details" | "thanks">("rating");
  const [rating, setRating] = useState<number | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issues = [
    { id: "too_few_hairstyles", label: "发型数量太少" },
    { id: "not_suitable", label: "推荐的发型不适合我" },
    { id: "detection_inaccurate", label: "脸型检测不准确" },
    { id: "images_poor_quality", label: "图片质量不好" },
    { id: "slow_loading", label: "加载太慢" },
    { id: "other", label: "其他问题" },
  ];

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
    setStep("details");
  };

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issueId)
        ? prev.filter((id) => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSubmit = async () => {
    if (!rating) return;

    setIsSubmitting(true);

    // 📊 追踪反馈提交
    trackFeedbackSubmit(rating, selectedIssues.join(","), comment.length > 0);

    // 📊 追踪用户抱怨
    selectedIssues.forEach((issue) => {
      trackComplaint(issue, comment || undefined);
    });

    // 模拟提交到后端（这里可以替换为实际的API调用）
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 可选：发送到你的后端
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          issues: selectedIssues,
          comment,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }

    setIsSubmitting(false);
    setStep("thanks");

    // 3秒后自动关闭
    setTimeout(() => {
      setIsOpen(false);
      // 重置状态
      setTimeout(() => {
        setStep("rating");
        setRating(null);
        setSelectedIssues([]);
        setComment("");
      }, 300);
    }, 3000);
  };

  const handleClose = () => {
    setIsOpen(false);
    // 重置状态
    setTimeout(() => {
      setStep("rating");
      setRating(null);
      setSelectedIssues([]);
      setComment("");
    }, 300);
  };

  return (
    <>
      {/* 浮动按钮 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">反馈</span>
        </button>
      )}

      {/* 反馈弹窗 */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-xl shadow-2xl border border-gray-200">
          {/* 头部 */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-lg">反馈</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 内容区 */}
          <div className="p-4">
            {/* 步骤1: 评分 */}
            {step === "rating" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">您对FaceStyler的体验如何？</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleRatingSelect(1)}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <ThumbsDown className="w-8 h-8 text-gray-400 group-hover:text-red-500" />
                    <span className="text-xs">不满意</span>
                  </button>
                  <button
                    onClick={() => handleRatingSelect(5)}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <ThumbsUp className="w-8 h-8 text-gray-400 group-hover:text-green-500" />
                    <span className="text-xs">满意</span>
                  </button>
                </div>
              </div>
            )}

            {/* 步骤2: 详细反馈 */}
            {step === "details" && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">请选择您遇到的问题：</p>
                  <div className="space-y-2">
                    {issues.map((issue) => (
                      <label
                        key={issue.id}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedIssues.includes(issue.id)}
                          onChange={() => handleIssueToggle(issue.id)}
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <span className="text-sm">{issue.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    补充说明（选填）：
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="请告诉我们更多详情..."
                    className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep("rating")}
                    className="flex-1"
                  >
                    返回
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || selectedIssues.length === 0}
                    className="flex-1 gap-2"
                  >
                    {isSubmitting ? (
                      "提交中..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        提交
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* 步骤3: 感谢 */}
            {step === "thanks" && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="font-medium mb-1">感谢您的反馈！</p>
                <p className="text-sm text-gray-600">
                  您的意见对我们非常重要
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
