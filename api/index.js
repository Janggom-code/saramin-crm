import Cors from 'cors';

const cors = Cors({
  origin: 'https://campaign.saramin.co.kr',
  methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
});

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

    const html = await response.text();
    const match = html.match(/location\.href\s*=\s*["']([^"']+)["']/);

    if (match && match[1]) {
      res.status(200).json({
        status: 'success',
        url: { pc: match[1] },
      });
    } else {
      res.status(500).json({ status: 'fail', message: 'Redirect URL not found' });
    }
  } catch (error) {
    console.error('[Proxy Error]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
