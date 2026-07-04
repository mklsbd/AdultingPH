import { NextRequest, NextResponse } from "next/server";
import { agencies } from "@/data/agencies";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the AdultingPH Assistant, a helpful guide for first-time job seekers in the Philippines who are trying to complete their mandatory pre-employment government requirements: SSS, NBI Clearance, PhilHealth, Pag-IBIG (HDMF), and BIR (TIN).

Ground rules:
- Be concise, practical, and encouraging. Use short paragraphs or bullet points.
- Reference Republic Act 11261 (First Time Jobseekers Assistance Act) when relevant — it entitles first-time job seekers to one free copy of these documents, provided they present a Barangay Certification confirming first-time job seeker status.
- Never claim to be an official government channel. If asked something you're unsure of, tell the user to verify on the agency's official website.
- You are not affiliated with SSS, NBI, PhilHealth, Pag-IBIG, or BIR.
- Keep answers under 150 words unless the user asks for a detailed step-by-step walkthrough.

Reference data on official portals:
${agencies.map((a) => `- ${a.fullName} (${a.name}): ${a.url}`).join("\n")}`;

function fallbackReply(userText: string): string {
  const text = userText.toLowerCase();
  const match = agencies.find(
    (a) =>
      text.includes(a.id) ||
      text.includes(a.name.toLowerCase()) ||
      text.includes(a.fullName.toLowerCase())
  );

  if (match) {
    const stepsList = match.steps.map((s) => `${s.step}. ${s.text}`).join("\n");
    return `Here's a quick guide for ${match.fullName} (${match.name}):\n\n${stepsList}\n\nOfficial portal: ${match.url}\n\nUnder RA 11261, first-time job seekers can get this for free — check the Resource Center for details.`;
  }

  if (text.includes("ra 11261") || text.includes("first time job seeker") || text.includes("free")) {
    return "Republic Act 11261, the First Time Jobseekers Assistance Act, lets first-time job seekers get one free copy each of their Barangay Certification, NBI Clearance, police clearance, SSS, PhilHealth, Pag-IBIG, and BIR documents. Visit your Barangay Hall first to get the First Time Job Seeker Certificate, then bring it when applying at each agency. See the Resource Center tab for the full breakdown.";
  }

  return "I can help with SSS, NBI Clearance, PhilHealth, Pag-IBIG, or BIR requirements — just ask about one of them by name, or ask about Republic Act 11261 for the free first-time job seeker benefits. For live AI answers, the site owner can add an ANTHROPIC_API_KEY in the deployment settings.";
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastUserMessage =
      [...messages].reverse().find((m: { role: string }) => m.role === "user")?.content ?? "";

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: fallbackReply(lastUserMessage) });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ reply: fallbackReply(lastUserMessage) });
    }

    const data = await response.json();
    const reply =
      data.content?.find((c: { type: string }) => c.type === "text")?.text ??
      fallbackReply(lastUserMessage);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: "Something went wrong on my end. Please try again in a moment.",
    });
  }
}
