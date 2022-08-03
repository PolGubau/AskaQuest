import React from "react";
import AppLayout from "src/components/Layout/AppLayout";
import Nav from "src/components/Nav";
import Collections from "./api/collections";
var bcrypt = require("bcryptjs");

export default function NewQuestion() {
  return (
    <>
      <Nav path={["collections"]} />
      <AppLayout>
        <main>
          <section>
            <p>Create your collection: </p>
          </section>
        </main>
      </AppLayout>
    </>
  );
}
