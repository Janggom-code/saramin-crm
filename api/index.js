export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fetch = (await import('node-fetch')).default;

  const response = await fetch('https://www.saramin.co.kr/zf_user/member/ai-interview/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' ,'Cookie': 'PCID=17442520213723614862444; ab180ClientId=8173a373-2ed5-42bb-acae-7ed10382a813; _gcl_au=1.1.909940520.1744252026; Mtype=P; saramin_last_login_provider=saramin; _ga_DBVYV88LS9csn=cmc2T2tQVVNVKzJmbS82b0RyR0lJdz09=GS1.1.1744587899.1.0.1744587900.0.0.0; _ga_79K60EPF4F=GS1.1.1744615469.1.0.1744615469.0.0.0; _ga_6LECKW4FKW=GS1.1.1744615535.1.0.1744615539.0.0.0; airbridge_user=%7B%22externalUserID%22%3A%225653686%22%2C%22alias%22%3A%7B%22amplitude_id%22%3A%225653686%22%7D%7D; _fbp=fb.2.1744769606084.86574602456202978; hidePersonRewardNudgeCount=1; AMP_a687efd08d=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJPS2xQUk1mck0yTzhvNWZYamxkclNlJTIyJTJDJTIydXNlcklkJTIyJTNBJTIyNTY1MzY4NiUyMiUyQyUyMnNlc3Npb25JZCUyMiUzQTE3NDUzNzI2MDE2OTQlMkMlMjJvcHRPdXQlMjIlM0FmYWxzZSUyQyUyMmxhc3RFdmVudFRpbWUlMjIlM0ExNzQ1MzczOTI4MTg5JTJDJTIybGFzdEV2ZW50SWQlMjIlM0EzNiUyQyUyMnBhZ2VDb3VudGVyJTIyJTNBMCU3RA==; airbridge_migration_metadata__saramin=%7B%22version%22%3A%221.10.69%22%7D; app_install_nudge=disable; _ga_3BYYBDR0XJ=GS2.1.s1746577034$o1$g1$t1746577084$j0$l0$h0; _ga_MSKDWN467B=GS2.1.s1746592373$o3$g0$t1746592373$j0$l0$h0; _ga_DBVYV88LS9=GS2.1.s1747126142$o4$g1$t1747126143$j0$l0$h0; personalization_special_tag_5653686=none; _ga_L2PN791WR5=GS2.1.s1747351198$o26$g0$t1747351198$j0$l0$h0; _ga_0PN5NFZW7P=GS2.1.s1747351198$o17$g0$t1747351198$j60$l0$h0$dezVhnBglesPDZiDLQo3qNJ-mCWUrfOpjlA; _ga_E0LMXXGRZK=GS2.1.s1747351893$o18$g1$t1747353069$j0$l0$h0; saramin_login_tab_default=p; _gid=GA1.3.2071313400.1747613127; UID=5653686; AUID=5653686; CUST_NO=5653686; ab.storage.deviceId.a2ac6b71-3416-464a-ac48-ef2cff5c2026=%7B%22g%22%3A%2221ba7f9a-c71e-359e-87b7-88c200b7c080%22%2C%22c%22%3A1740630791139%2C%22l%22%3A1747613588865%7D; ab.storage.userId.a2ac6b71-3416-464a-ac48-ef2cff5c2026=%7B%22g%22%3A%225653686%22%2C%22c%22%3A1747380323176%2C%22l%22%3A1747613588865%7D; googtrans=/ko/ko; PHPSESSID=sj64cjl056krkb0glslu0mrsv34cpr4qg92q2rsjutt6fsfn8f; sri_timestamp=1747628085000; __Secure-state=9pq1UXMgdJsX0W3Kjh_YpRYJzVoCW2JnVCfFDOjg2Ug; _ga_RZMVKR1996=GS2.1.s1747629146$o29$g1$t1747629203$j3$l0$h0$duMuACxfm91t_1odi-jhsF1VU3AeHBIJiTA; ab.storage.sessionId.a2ac6b71-3416-464a-ac48-ef2cff5c2026=%7B%22g%22%3A%22a3110d34-5d3e-b7c4-ba4b-1888943444e6%22%2C%22e%22%3A1747631279459%2C%22c%22%3A1747629144152%2C%22l%22%3A1747629479459%7D; _ga_58W0W855T7=GS2.1.s1747629146$o200$g1$t1747629479$j0$l0$h0; _ga_GR2XRGQ0FK=GS2.1.s1747629144$o229$g1$t1747629479$j60$l0$h0$d7jlnWjv0vQJyNjcexeCcTd6WGZbPnELVzA; amp_a687ef=oZgQ0ETGTxAi9q2wsp-Orf.NTY1MzY4Ng==..1irjd0u2r.1irjdb5u8.53.le.qh; _ga=GA1.3.443990929.1744252024; cto_bundle=9G7WLV9XVjlQQXZOS1VKVnNiWGw1dWo1UkpxZmMwR1Bnb3Z1eFcydVUwU3hZVVBmaGtGbDhBNXpmNFklMkI5TW5yM09lZkZEREs5M1VBWVliVFdJdlpUdGVHZEJoYnNnTzZvd2NkTFpuY1NpZFdhQUtGb3h2dTRON2s0RiUyQnJsVDZ2ZjJ6czhIbzJYeHRmcUxsSG1waHdjbUVFYXhXODRnSTE1M2JXSzNjJTJCZzRCajlZQVElM0Q; airbridge_session=%7B%22id%22%3A%22e10708ed-c001-4200-9f7a-d6c7800966a1%22%2C%22timeout%22%3A1800000%2C%22start%22%3A1747629145275%2C%22end%22%3A1747629481123%7D; _ga_X6JZ0HCBFC=GS2.1.s1747629144$o219$g1$t1747629481$j0$l0$h0; RSRVID=m2|aCq2M|aCq0W' },
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