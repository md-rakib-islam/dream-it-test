"use client";
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <span>Something went wrong! {error?.message}</span>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
