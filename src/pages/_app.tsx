import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '../../public/static/fonts/style.css'
import styles from '../styles/App.module.css'
// import {store} from '../app/store';
import wrapper from '../app/store';
import Link from 'next/link'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className={styles.headerWrap}>
        {/* <h1>계산기</h1> */}
        <nav className={styles.navMenu}>
            <Link href="/">Home</Link>
            <Link href="/about">Blog</Link>
            <Link href="/blog/hello-world">Work</Link>
            <Link href="#">About</Link>
            <div className={styles.dot}></div>
        </nav>
      </header>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App);

// wrapper 로 App 컴포넌트를 감싸준다.
// 브라우저의 redux 상태 동기화는 물론, Provider store 까지 알아서 주입해준다.
