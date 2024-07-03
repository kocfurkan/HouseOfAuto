import { getSession } from "next-auth/react";
import React from "react";
import Heading from "../components/Heading";
import AuthTest from "./AuthTest";
import { getTokenWorkaround } from "../actions/authActions";

export default async function Session() {
  const session = await getSession();
  const token = getTokenWorkaround();
  console.log(token);

  return (
    <div>
      <div className="bg-blue-200 border-2 border-blue-500">
        <h3 className="text-lg">Session data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div className="mt-4">
        <AuthTest></AuthTest>
      </div>
      <div className="bg-green-200 border-2 border-blue-500 mt-4">
        <h3 className="text-lg">Token data</h3>
        <pre className="overflow-auto">{JSON.stringify(token, null, 2)}</pre>
      </div>
    </div>
  );
}
