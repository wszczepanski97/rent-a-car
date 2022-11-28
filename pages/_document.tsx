import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Car Rental - the place where you can rent the best cars in the world."
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
