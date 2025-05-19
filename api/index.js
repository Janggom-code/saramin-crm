export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fetch = (await import('node-fetch')).default;

  const response = await fetch('https://www.saramin.co.kr/zf_user/member/ai-interview/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      payment_page: 'ai_interview_introduce',
      item_id: 'ai_interview_package_3',
      category: 'video_interview_package',
      duration: '30',
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
