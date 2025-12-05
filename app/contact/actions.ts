"use server";

import { Resend } from "resend";

// .env 파일에 RESEND_API_KEY가 있는지 확인하세요.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const message = formData.get("message") as string;

  // 간단한 유효성 검사
  if (!name || !email || !message) {
    return { success: false, error: "필수 입력 항목이 누락되었습니다." };
  }

  try {
    const { data, error } = await resend.emails.send({  
      // 주의: 도메인 인증 전에는 'onboarding@resend.dev'만 사용 가능
      from: "SoomAI Contact Page <onboarding@resend.dev>",
      to: ["hello@soomai.life"],
      
      // [수정됨] 답장 버튼 누르면 고객 이메일로 바로 연결
      replyTo: email, 
      
      subject: `[SoomAI 문의] ${name}님 (${company})의 메시지`,
      html: `
        <h2>새로운 문의가 도착했습니다.</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>회사:</strong> ${company}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <hr />
        <p><strong>메시지:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p> 
      `,
    });

    if (error) {
      console.error("Resend Error:", error); // 서버 로그 확인용
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, error: "서버 오류가 발생했습니다." };
  }
}