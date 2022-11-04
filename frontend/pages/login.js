import Head from "next/head";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <div>
      <Head>
        <title>Mighty Jaxx</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-primary min-h-screen flex justify-center items-center">
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;