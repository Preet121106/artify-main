/* eslint-disable prettier/prettier */
// app/entry.server.tsx
import { PassThrough } from "stream";
import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";

export default function handleRequest(
  request: Request,
  statusCode: number,
  headers: Headers,
  context: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={context} url={request.url} />,
      {
        onShellReady() {
          const body = new PassThrough();

          headers.set("Content-Type", "text/html");

          resolve(
            new Response(body as unknown as BodyInit, {
              status: didError ? 500 : statusCode,
              headers,
            })
          );

          pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(err) {
          didError = true;
          console.error(err);
        },
      }
    );

    setTimeout(abort, 5000);
  });
}
