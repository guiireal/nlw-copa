import Image from "next/image";
import { FormEvent, useState } from "react";
import appNlwCopaPreview from "../assets/app-nlw-copa-preview.png";
import iconCheck from "../assets/icon-check.svg";
import logo from "../assets/logo.svg";
import usersAvatarExample from "../assets/users-avatar-example.png";
import { api } from "../lib/axios";

type PageProps = {
  bettingPoolCount: number;
  guessCount: number;
  userCount: number;
};

export default function Home({
  bettingPoolCount,
  guessCount,
  userCount,
}: PageProps) {
  const [bettingPoolTitle, setBettingPoolTitle] = useState("");

  async function storeBettingPool(event: FormEvent) {
    event.preventDefault();

    try {
      const { data } = await api.post("/betting-pools", {
        title: bettingPoolTitle,
      });

      const { code } = data;

      await navigator.clipboard.writeText(code);

      alert(
        `Bolão criado com sucesso! O código ${code} foi copiado para a área de transferência!`
      );

      setBettingPoolTitle("");
    } catch (error) {
      console.error(error);
      alert("Falha ao criar o bolão, tente novamente!");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logo} alt="NLW Copa" />
        <h1 className="text-5xl font-bold leading-tight text-white mt-14">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="flex items-center gap-2 mt-10">
          <Image src={usersAvatarExample} alt="Avatares dos usuários" />
          <strong className="text-xl text-gray-100">
            <span className="text-ignite-500">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form onSubmit={storeBettingPool} className="flex gap-2 mt-10">
          <input
            className="flex-1 px-6 py-4 text-sm text-gray-100 bg-gray-800 border border-gray-600 rounded"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            onChange={(event) => setBettingPoolTitle(event.target.value)}
            value={bettingPoolTitle}
          />
          <button
            className="px-6 py-4 font-bold text-gray-900 uppercase bg-yellow-500 rounded font-sm hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="flex items-center justify-between pt-10 mt-10 text-gray-100 border-t border-gray-600">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="Ícone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2lx">+{bettingPoolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px bg-gray-600 h-14" />

          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="Ícone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2lx">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appNlwCopaPreview}
        alt="Dois celulares exib indo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const [{ data: bettingPoolData }, { data: guessData }, { data: userData }] =
    await Promise.all([
      api.get("/betting-pools/count"),
      api.get("/guesses/count"),
      api.get("/users/count"),
    ]);

  return {
    props: {
      bettingPoolCount: bettingPoolData.count,
      guessCount: guessData.count,
      userCount: userData.count,
    },
  };
}
