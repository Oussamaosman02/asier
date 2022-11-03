import Layout from 'components/Layout'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <Layout title='ASIeR'>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
