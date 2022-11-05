type PageProps = {
  count: number;
};

export default function Home({ count }: PageProps) {
  return <h1>Contagem: {count}</h1>;
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/betting-pools/count");
  const { count } = await response.json();

  return {
    props: {
      count,
    },
  };
};
