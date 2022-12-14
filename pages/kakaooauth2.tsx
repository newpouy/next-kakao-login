import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import qs from "qs";


// 카카오 인증 후 카카오rest api /me 를 호출하여 사용자 정보를 가져옴
const Kakaooauth2: NextPage = () => {
  const router = useRouter()
  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      console.log(data,' in data')
    } catch (err) {
      console.log(err);
    }
  };
  const getToken = async (code: string | null) => {
    const CLIENT_ID = process.env.KAKAO_REST_API_KEY;
    const REDIRECT_URI_2 =  process.env.KAKAO_REDIRECT_URI_2;
    const CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET
    const KAKAO_TOKEN_URL = process.env.KAKAO_TOKEN_URL
    const KAKAO_GRANT_TYPE = process.env.KAKAO_GRANT_TYPE;
    const payload = qs.stringify({
      grant_type: KAKAO_GRANT_TYPE,
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI_2,
      code: code,
      client_secret: CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post(KAKAO_TOKEN_URL, payload);
      // Kakao Javascript SDK 초기화
      if(window) window.Kakao.init(CLIENT_ID);
      // access token 설정
      if(window) window.Kakao.Auth.setAccessToken(res.data.access_token);
      // console.log(res)
      getProfile()
      router.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=> {
    const code = new URL(window.location.href).searchParams.get("code");
    getToken(code)
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js">
        </script>
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>kakaooauth2 &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export default Kakaooauth2
