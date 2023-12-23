"use client"

import Link from "next/link";

export default function Custom404() {
  return (
    <div>
      <center>
        <h1 className=" text-5xl ">
          404 - Page not found. &nbsp;{" "}
          <Link href={"/"} className="underline">
            Go back.
          </Link>
        </h1>
      </center>
    </div>
  );
}
