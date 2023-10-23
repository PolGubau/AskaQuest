import "./styles.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
