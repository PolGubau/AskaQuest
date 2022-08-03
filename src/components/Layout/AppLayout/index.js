import NavSettings from "src/components/NavSettings";
import styles, { globalStyles } from "./styles";

export default function AppLayout({ children }) {
  return (
    <>
      <div>
        <section className="settings">
          <NavSettings />
        </section>
        <main>{children}</main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}
