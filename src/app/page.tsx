import Form from "@/components/ui/Form";


export default function Home() {

  return (
    <main className="grid place-items-center h-svh">
      <section className="bg-gray-800  w-1/2 p-8 rounded shadow-2xl space-y-10">
        <h1 className="text-white text-4xl text-center uppercase font-bold">
          Upload Image
        </h1>
        <Form />
      </section>
    </main>
  );
}
