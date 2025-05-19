import Cors from 'cors';

// CORS 미들웨어 설정
const cors = Cors({
  origin: 'https://campaign.saramin.co.kr', // 요청을 허용할 origin
  methods: ['POST'],
});

// 미들웨어 실행을 Promise 형태로 변환
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // CORS 허용 처리
  await runMiddleware(req, res, cors);

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