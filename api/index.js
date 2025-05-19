import Cors from 'cors';

// CORS 설정 (methods에 OPTIONS 포함)
const cors = Cors({
  origin: 'https://campaign.saramin.co.kr',
  methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
});

// 미들웨어 실행 함수
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  // ✅ OPTIONS 요청에 응답
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fetch = (await import('node-fetch')).default;

  try {
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

    const data = await response.text();
    res.status(200).json(data);
  } catch (error) {
    console.error('[Proxy Error]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
